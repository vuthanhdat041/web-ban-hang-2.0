const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const verifyRoles = require("../middleware/verifyRoles");

// xem danh sách khách hàng
router.get(
  "/getAll",
  verifyToken,
  verifyRoles([1, 4]),
  userController.getAllUsersController
);
//khóa hoặc mở tài khoản khách hàng
router.put(
  "/status/:id",
  verifyToken,
  verifyRoles([1, 4]),
  userController.updateUserStatusController
);
// ttin chi tiết user và lịch sử mua hàng
router.get(
  "/detail/:userId",
  verifyToken,
  verifyRoles([1, 4]),
  userController.detailUserAndHistoryOrderController
);
// tièm user qa tên, số điện thoạithoại
router.get("/search", userController.searchUserByNameAndPhoneController);
// thêm address
router.put(
  "/update-address",
  verifyToken,
  verifyRoles([5]),
  userController.updateUserAddressController
);
// profile người dùng
router.get("/getProfile", verifyToken, userController.getProfileController);

module.exports = router;
