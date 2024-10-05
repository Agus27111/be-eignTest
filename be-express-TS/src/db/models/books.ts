import db from "../../config/dbConnect";
import { DataTypes, Model, Optional } from "sequelize";
import Borrowing from "./borrowing";

interface BookAttributes {
  code: string;
  title: string;
  author: string;
  stock: number;
}

interface BookCreationAttributes extends Optional<BookAttributes, "code"> {}

class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public code!: string;
  public title!: string;
  public author!: string;
  public stock!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Book.init(
  {
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "books",
    timestamps: true,
  }
);

// Relasi
Book.hasMany(Borrowing, {
  foreignKey: "bookCode",
  sourceKey: "code",
});

Borrowing.belongsTo(Book, {
  foreignKey: "bookCode",
  targetKey: "code",
});

export default Book;
