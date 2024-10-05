import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import Member from "../db/models/members";
import Book from "../db/models/books";
import Borrowing from "../db/models/borrowing";
import Helper from "../helpers/Helper";
import { Op } from "sequelize";
import sequelizeConnection from "../config/dbConnect";

const BorrowController = {
  borrowBooks: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<Response | void> => {
    const t = await sequelizeConnection.transaction();
    try {
      console.log("🚀 ~ req.user:", req.user);
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { code, username } = req.user;
      const { bookCode } = req.body;
      if (!bookCode) {
        return res.status(400).json({
          message: "Book code is required",
        });
      }

      const isBookAlreadyBorrowedByMember = await Borrowing.findOne({
        where: {
          memberCode: code,
          bookCode: bookCode,
          returnDate: {
            [Op.eq]: null,
          },
        },
      });

      if (isBookAlreadyBorrowedByMember) {
        return res.status(400).json({
          message: "Anda sudah meminjam buku ini dan belum mengembalikannya.",
        });
      }

      // Validasi apakah member sudah meminjam 2 buku
      const { count } = await Borrowing.findAndCountAll({
        where: {
          memberCode: code,
          returnDate: null,
        },
      });

      const hasReachedMaxLoans = count >= 2;

      if (hasReachedMaxLoans) {
        return res.status(400).json({
          message: "Member already has reached the maximum number of loans",
        });
      }
      // Cek apakah buku tersebut tersedia

      const book = await Book.findOne({ where: { code: bookCode } });

      if (!book) {
        return res.status(404).json({
          message: "Buku tidak ditemukan",
        });
      }

      // Cek apakah buku tersebut sedang dipinjam oleh member lain
      const isBookBorrowedByOthers = await Borrowing.findOne({
        where: {
          bookCode: book.code,
          returnDate: {
            [Op.eq]: null,
          },
          memberCode: {
            [Op.ne]: code,
          },
        },
      });

      //menangani jika buku telah dipinjam
      if (isBookBorrowedByOthers) {
        return res.status(400).json({
          message: "Buku sedang dipinjam oleh member lain",
        });
      }

      // Cek apakah member dalam penalti (penalty period 3 hari)
      const lastLoan = await Borrowing.findOne({
        where: { memberCode: code },
        order: [["returnDate", "DESC"]],
      });

      const penaltyPeriod = 3 * 24 * 60 * 60 * 1000; // 3 hari dalam milidetik
      const isUnderPenalty =
        lastLoan &&
        lastLoan.returnDate !== null &&
        lastLoan.returnDate !== undefined &&
        new Date().getTime() - new Date(lastLoan.returnDate).getTime() <=
          penaltyPeriod;

      // menanangani jika dia terkena penalty
      if (isUnderPenalty) {
        return res.status(400).json({
          message:
            "Anda berada dalam masa penalty. silahkan baca ketentuan yang berlaku!",
        });
      }
      // Jika semua validasi terpenuhi, buku dipinjamkan ke member dan stok buku dikurangi
      const canBorrowBook =
        !hasReachedMaxLoans && !isBookBorrowedByOthers && !isUnderPenalty;

      if (canBorrowBook) {
        // Logika untuk meminjamkan buku
        await Borrowing.create({
          code: uuidv4(),
          memberCode: code,
          bookCode: book.code,
          borrowDate: new Date(),
          dueDate: new Date(Date.now() + penaltyPeriod),
          returnDate: null,
          status: "borrowed",
        });

        // Kurangi stok buku
        await Book.decrement("stock", { by: 1, where: { code: bookCode } });

        await t.commit();

        return res.status(200).json({
          message: "Buku berhasil dipinjamkan!",
        });
      } else {
        return res.status(400).json({
          message: "Tidak bisa meminjam buku. Cek syarat-syarat peminjaman.",
        });
      }
    } catch (error: any) {
      await t.rollback();
      console.error(error);
      Helper.ResponseData(500, error.message, null, null);
    }
  },

  returnBooks: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<Response | void> => {
    const t = await sequelizeConnection.transaction();
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const code = req.user.code;

      const { bookCode } = req.body;

      // Cari peminjaman aktif (status 'borrowed') dari member yang login
      const borrowing = await Borrowing.findOne({
        where: { memberCode: code, bookCode, status: "borrowed" },
      });

      if (!borrowing) {
        return res.status(404).json({ message: "Peminjaman tidak ditemukan." });
      }

      borrowing.returnDate = new Date();
      borrowing.status = "returned";
      await borrowing.save(); // Simpan perubahan

      // Tambahkan stok buku
      const book = await Book.findOne({ where: { code: bookCode } });
      if (book) {
        book.stock += 1;
        await book.save(); // Simpan perubahan stok
      }

      await t.commit();

      return res.status(200).json({ message: "Buku berhasil dikembalikan!" });
    } catch (error: any) {
      await t.rollback();
      Helper.ResponseData(500, error.message, null, null);
    }
  },

  checkBooks: async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const bookCode = req.query.bookCode as string | undefined;

      if (!bookCode) {
        return res.status(400).json({ message: "bookCode is required." });
      }

      // Cari buku berdasarkan code
      const book = await Book.findOne({ where: { code: bookCode } });
      if (!book) {
        return res.status(404).json({ message: "Buku tidak ditemukan." });
      }

      return res.status(200).json({ book });
    } catch (error: any) {
      Helper.ResponseData(500, error.message, null, null);
    }
  },

  memberCheck: async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const memberCode = req.query.memberCode as string | undefined;

      if (!memberCode) {
        return res.status(400).json({ message: "memberCode is required!" });
      }

      // Cari member berdasarkan code
      const member = await Member.findOne({ where: { code: memberCode } });

      if (!member) {
        return res.status(404).json({ message: "Member tidak ditemukan." });
      }

      const hasborrowed = await Borrowing.findAll({
        where: {
          memberCode: memberCode,
        },
        attributes: [
          "memberCode",
          "bookCode",
          "borrowDate",
          "dueDate",
          "returnDate",
          "status",
        ],
      });

      return res.status(200).json({ hasborrowed });
    } catch (error: any) {
      Helper.ResponseData(500, error.message, null, null);
    }
  },
};

export default BorrowController;
