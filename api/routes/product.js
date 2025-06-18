const router = require("express").Router();
const productController = require("../controllers/productController");
const verifyRoles = require("../middleware/verifyRoles");
const verifyToken = require("../middleware/verifyToken");

// xem danh sách sản phẩm
router.post(
  "/getAllProduct",
  verifyToken,
  verifyRoles([1, 2]),
  productController.getAllProductsController
);
// lấy chi tiết sản phẩm
router.get(
  "/getById/:productId",
  verifyToken,
  verifyRoles([1, 2]),
  productController.getProductDetailController
);

// thêm sản phẩm
router.post(
  "/addProduct",
  verifyToken,
  verifyRoles([1, 2]),
  productController.addProductController
);
// sửa ttin sản phẩm
router.put(
  "/:id",
  verifyToken,
  verifyRoles([1, 2]),
  productController.editProductController
);
// xóa sản phẩm
router.delete(
  "/:id",
  verifyToken,
  verifyRoles([1, 2]),
  productController.deleteProductController
);

// xem danh sách sản phẩm không có accesory
router.post(
  "/getAllProductWithoutAccessories",
  productController.getAllProductsWithoutAccessoriesController
);

// xem 10 sản phẩm mới nhất
router.get("/getNewestProduct", productController.getNewestProductsController);

module.exports = router;
