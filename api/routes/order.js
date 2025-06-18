const router = require("express").Router();
const orderController = require("../controllers/orderController");
const verifyRoles = require("../middleware/verifyRoles");
const verifyToken = require("../middleware/verifyToken");

// // xem danh sách đơn hàng
router.post(
  "/getAllOrders",
  verifyToken,
  verifyRoles([1, 3]),
  orderController.getAllOrdersController
);

// Cập nhật trạng thái đơn hàng
router.put(
  "/:id/status",
  verifyToken,
  verifyRoles([1, 3]),
  orderController.updateOrderStatusController
);
// Xem chi tiết giỏ hàng người dùng
router.get(
  "/userCart/:id",
  verifyToken,
  verifyRoles([5]),
  orderController.getCartUserController
);
// thêm sản phẩm vào giỏ hàng
router.post(
  "/add",
  verifyToken,
  verifyRoles([5]),
  orderController.addToCartController
);
// xóa sản phẩm trong giỏ hàng
router.delete(
  "/delete",
  verifyToken,
  verifyRoles([5]),
  orderController.deleteCartController
);
// Cập nhật trạng thái đơn hàng sau khi thanh toán
router.put(
  "/:id/statusAfterPayment",
  verifyToken,
  verifyRoles([5]),
  orderController.statusAfterPaymentController
);
// Xem chi tiết đơn hàng user
router.get(
  "/user/:id",
  verifyToken,
  verifyRoles([5]),
  orderController.getOrderDetailUserController
);

// Cập nhật trạng thái đơn hàng
router.get(
  "/reports/revenue",
  verifyToken,
  verifyRoles([1]),
  orderController.getRevenueController
);

// xem danh sách đơn hàng theo ngày tháng năm
router.get(
  "/getAllOrdersByDate",
  verifyToken,
  verifyRoles([1, 3]),
  orderController.getAllOrdersByDateController
);

// Xem chi tiết đơn hàng
router.get(
  "/:id",
  verifyToken,
  verifyRoles([1, 3]),
  orderController.getOrderDetailController
);

// mua nhanh san phẩm
router.post(
  "/quickBuy",
  verifyToken,
  verifyRoles([5]),
  orderController.quickBuyController
);

module.exports = router;
