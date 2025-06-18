const User = require("./User");
const Role = require("./Role");
const Permission = require("./Permission");
const RolePermission = require("./RolePermission");
const Category = require("./Category");
const Product = require("./Product");
const Order = require("./Order");
const OrderDetail = require("./OrderDetail");

// Quan hệ User - Role (1:N)
Role.hasMany(User, { foreignKey: "role_id" });
User.belongsTo(Role, { foreignKey: "role_id" });

// Quan hệ Role - Permission (N:M)
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "role_id",
});
Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: "permission_id",
});

// Quan hệ Category - Product (1:N)
Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

// Quan hệ User - Order (1:N)
User.hasMany(Order, { foreignKey: "user_id", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "user_id" });

// Quan hệ Order - Product (N:M) thông qua OrderDetail
Order.belongsToMany(Product, { through: OrderDetail, foreignKey: "order_id" });
Product.belongsToMany(Order, {
  through: OrderDetail,
  foreignKey: "product_id",
});

module.exports = {
  User,
  Role,
  Permission,
  RolePermission,
  Category,
  Product,
  Order,
  OrderDetail,
};
