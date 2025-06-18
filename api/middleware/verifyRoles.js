// 1 super_admin
// 2 product_manager
// 3 order_manager
// 4 customer_manager
// 5 customer

const verifyRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Chưa xác thực người dùng!" });
    }
    if (!allowedRoles.includes(req.user.role_id)) {
      console.log("Bạn không có quyền truy cập");

      return res.status(403).json({ message: "Bạn không có quyền truy cập" });
    }
    next();
  };
};

module.exports = verifyRoles;
