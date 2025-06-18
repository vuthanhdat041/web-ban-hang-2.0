const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Permission = sequelize.define("Permission", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true, // Đảm bảo quyền không bị trùng
    },
    description: {
        type: DataTypes.TEXT, // Mô tả chi tiết quyền
        allowNull: true, // Có thể để trống
    }
}, {
    tableName: "permissions", // Đặt tên bảng là "permissions"
    timestamps: false,  // Không cần createdAt, updatedAt
});

module.exports = Permission;
