const { sequelize } = require("../config/dbConfig");
const { DataTypes } = require("sequelize");

const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true, // Đảm bảo không có danh mục trùng lặp
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true, // Mô tả có thể để trống
    }
}, {
    tableName: "categories", // Đặt tên bảng là "categories"
    timestamps: false,  // Không cần createdAt, updatedAt
});

module.exports = Category;
