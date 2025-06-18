const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Role = sequelize.define("Role", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true, // Đảm bảo không có role trùng lặp
    }
}, {
    tableName: "roles", // Đặt tên bảng là "roles" thay vì "Role"
    timestamps: false,  // Không cần createdAt, updatedAt
});

module.exports = Role;
