const Category = require("../models/Category");

const getAllCategoriesService = async () => {
  try {
    const categories = await Category.findAll();

    return {
      message: "Lấy danh sách danh mục thành công!",
      code: 201,
      data: categories,
    };
  } catch (err) {
    console.log("🚀 ~ getAllCategoriesService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const addCategoryService = async (name, description) => {
  try {
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return { code: 400, message: "Danh mục đã tồn tại!" };
    }

    const newCategory = await Category.create({ name, description });

    return {
      message: "Thêm sản phẩm thành công!",
      code: 201,
      data: newCategory,
    };
  } catch (err) {
    console.log("🚀 ~ addCategoryService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const deleteCategoryService = async (categoryId) => {
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return { code: 404, message: "Danh mục không tồn tại!" };
    }
    await category.destroy();

    return { code: 200, message: "Xóa danh mục  thành công!" };
  } catch (err) {
    console.log("🚀 ~ deleteCategoryService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

module.exports = {
  getAllCategoriesService,
  addCategoryService,
  deleteCategoryService,
};
