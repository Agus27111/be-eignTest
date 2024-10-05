import db from "../../config/dbConnect";
import { DataTypes, Model, Optional } from "sequelize";
import Member from "./members";
import Book from "./books";

interface BorrowingAttributes {
  code: string;
  memberCode: string;
  bookCode: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date | null;
  status: string;
}

// Atribut yang digunakan saat membuat data baru (opsional)
interface BorrowingCreationAttributes
  extends Optional<BorrowingAttributes, "code"> {}

// Model Borrowing
class Borrowing
  extends Model<BorrowingAttributes, BorrowingCreationAttributes>
  implements BorrowingAttributes
{
  public code!: string;
  public memberCode!: string;
  public bookCode!: string;
  public borrowDate!: Date;
  public dueDate!: Date;
  public returnDate?: Date | null;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inisialisasi model
Borrowing.init(
  {
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    memberCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("borrowed", "returned"),
      defaultValue: "returned",
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "borrowings",
    timestamps: true,
  }
);

export default Borrowing;
