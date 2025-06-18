const { sequelize } = require("../config/dbConfig");
const { DataTypes } = require("sequelize");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2), // DECIMAL phù hợp cho giá tiền
      allowNull: false,
    },
    order_date: {
      type: DataTypes.DATE, // TIMESTAMP = DATE trong Sequelize
      allowNull: false,
      defaultValue: DataTypes.NOW, // Lấy thời gian hiện tại
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Đang chọn hàng",
      validate: {
        isIn: [
          [
            "Đang chọn hàng",
            "Chờ xác nhận",
            "Đã xác nhận",
            "Đang giao hàng",
            "Đã giao hàng",
            "Đã hủy",
          ],
        ],
      },
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    timestamps: false,
  }
);

module.exports = Order;
