const productService = require("../services/productService");

const getAllProductsController = async (req, res) => {
  try {
    const raw = req.body.categoryId;
    let condition = raw;

    if (!isNaN(raw)) {
      condition = Number(raw);
    }

    let data = await productService.getAllProductsService(condition);
    return res.status(200).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ getAllProductsController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};
const getProductDetailController = async (req, res) => {
  try {
    const { productId } = req.params;
    let data = await productService.getProductDetailService(productId);
    console.log("🚀 ~ getProductDetailController ~ productId:", productId);

    return res.status(200).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ getProductDetailController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const addProductController = async (req, res) => {
  try {
    let data = await productService.addProductService(req.body);

    return res.status(200).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ addProductController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const editProductController = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await productService.editProductService(id, req.body);
    return res.status(data.code).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ editProductController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await productService.deleteProductService(id);
    return res.status(200).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ deleteProductController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const getAllProductsWithoutAccessoriesController = async (req, res) => {
  try {
    const condition = req.body;
    console.log(
      "🚀 ~ getAllProductsWithoutAccessoriesController ~ condition:",
      condition
    );
    const { categoryId } = req.body;
    const activeSortKeys = Object.entries(condition)
      .filter(([key, value]) => key !== "priceRange" && value === true)
      .map(([key]) => key);
    const priceRange = condition.priceRange;
    let data = await productService.getAllProductsWithoutAccessoriesService({
      activeSortKeys,
      priceRange,
      categoryId,
    });
    return res.status(200).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ getAllProductsWithoutAccessoriesController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const getNewestProductsController = async (req, res) => {
  try {
    let data = await productService.getNewestProductsService();
    return res.status(200).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ getNewestProductsController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};
module.exports = {
  getAllProductsController,
  getProductDetailController,
  addProductController,
  editProductController,
  deleteProductController,
  getAllProductsWithoutAccessoriesController,
  getNewestProductsController,
};
