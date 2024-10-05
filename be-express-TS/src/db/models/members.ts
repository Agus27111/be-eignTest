import db from "../../config/dbConnect";
import { DataTypes, Model, Optional } from "sequelize";
import Borrowing from "./borrowing";

interface MemberAttributes {
  code: string;
  name: string;
}

interface MemberCreationAttributes extends Optional<MemberAttributes, "code"> {}

class Member
  extends Model<MemberAttributes, MemberCreationAttributes>
  implements MemberAttributes
{
  public code!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Member.init(
  {
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "members",
    timestamps: true,
  }
);

Member.hasMany(Borrowing, {
  foreignKey: "memberCode",
  sourceKey: "code",
});

export default Member;
