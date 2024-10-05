import { Request, Response } from "express";
import {
  loginSchema,
  registerSchema,
} from "../middleware/validation/UserValidation";
import Helper from "../helpers/Helper";
import Member from "../db/models/members";

const MemberController = {
  register: async (req: Request, res: Response) => {
    try {
      const { code, name } = req.body;

      const { error } = registerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }

      const isCodeExist = await Member.findOne({
        where: {
          code: code,
        },
      });

      if (isCodeExist) {
        return res.status(400).json({
          status: "error",
          message: "Code must be different from other members",
        });
      }

      const member = await Member.create({ code, name });

      res.status(201).json({
        status: "User registered",
        data: { member },
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        message: "Failed to register",
        error: error.message,
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { code, name } = req.body;

      const { error } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }

      const member = await Member.findOne({ where: { code } });
      if (!member) {
        return res.status(404).json({
          status: "error",
          message: "Member not found",
        });
      }

      // Buat token
      const token = Helper.GenerateToken({
        username: member.name,
        code: member.code,
      });

      const refreshToken = Helper.GenerateRefreshToken({
        username: member.name,
        code: member.code,
      });

      return res.status(200).json({
        status: "Successful login",
        token: token,
        refreshToken: refreshToken,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        message: "Failed to login",
        error: error.message,
      });
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const { code } = req.body;

      const member = await Member.findOne({ where: { code: code } });

      if (!member) {
        return res.status(400).json({
          status: "error",
          message: "no member found",
        });
      }

      return res.status(200).json({
        status: "User details fetched",
        member: member,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        message: "Failed to get user",
        error: error.message,
      });
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        status: "success",
        message: "Logout successful",
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        message: "Failed to logout",
        error: error.message,
      });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const allMember = await Member.findAll();
      return res.status(200).json({
        status: "Users fetched",
        data: allMember,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: "error",
        message: "Failed to get all member",
        error: error.message,
      });
    }
  },
};

export default MemberController;
