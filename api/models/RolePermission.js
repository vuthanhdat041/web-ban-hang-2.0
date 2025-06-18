const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const RolePermission = sequelize.define("Role_Permission", {
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "roles",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "permissions",
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    tableName: "role_permission", // Đặt tên bảng là role_permissions
    timestamps: false,  // Không cần createdAt, updatedAt
});

module.exports = RolePermission;
