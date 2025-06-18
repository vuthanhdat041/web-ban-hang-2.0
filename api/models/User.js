const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Kiểm tra định dạng email hợp lệ
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Hoạt động",
      validate: {
        isIn: [["Hoạt động", "Đã khóa"]], // Chỉ cho phép 2 giá trị này
      },
    },
  },
  {
    timestamps: true,
    tableName: "users",
  }
);

module.exports = User; // Giữ tên model số ít (quy chuẩn của Sequelize)
