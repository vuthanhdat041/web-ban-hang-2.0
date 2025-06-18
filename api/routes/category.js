const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

// xem danh mục
router.get("/getAllCategories", categoryController.getAllCategoriesController);
// thêm danh mục
router.post("/addCategory", categoryController.addCategoryController);
// xóa danh mục
router.delete("/:id", categoryController.deleteCategoryController);

module.exports = router;
