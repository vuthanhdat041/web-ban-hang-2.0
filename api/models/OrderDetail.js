const { sequelize } = require("../config/dbConfig");
const { DataTypes } = require("sequelize");

const OrderDetail = sequelize.define(
    "OrderDetail",
    {
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "orders", // Khóa ngoại đến bảng `orders`
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "products", // Khóa ngoại đến bảng `products`
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        tableName: "order_details",
        timestamps: false,
    }
);

module.exports = OrderDetail;
