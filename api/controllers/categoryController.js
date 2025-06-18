const categoryService = require("../services/categoryService");

const getAllCategoriesController = async (req, res) => {
  try {
    let data = await categoryService.getAllCategoriesService();
    return res.status(data.code).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ getAllCategoriesController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const addCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ code: 400, message: "Tên danh mục không được để trống!" });
    }

    let data = await categoryService.addCategoryService(name, description);
    return res.status(data.code).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ addCategoryController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ code: 400, message: "Thiếu ID danh mục!" });
    }
    let data = await categoryService.deleteCategoryService(id);
    return res.status(data.code).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ deleteCategoryController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

module.exports = {
  getAllCategoriesController,
  addCategoryController,
  deleteCategoryController,
};
