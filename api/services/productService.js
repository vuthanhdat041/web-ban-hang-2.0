const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
// require("../models/AssociationsRelationship")();
const { Op } = require("sequelize");

const getAllProductsService = async (categoryId) => {
  try {
    let whereCondition = {};

    if (categoryId === "all") {
      whereCondition = {};
    } else if (typeof categoryId === "number") {
      whereCondition.category_id = categoryId;
    }

    const products = await Product.findAll({
      where: whereCondition,
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });
    if (!products || products.length === 0) {
      return { code: 404, message: "Không có sản phẩm nào!", data: [] };
    }
    return {
      message: "Lấy danh sách đơn hàng thành công!",
      code: 201,
      data: products,
    };
  } catch (err) {
    console.log("🚀 ~ getAllProductsService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const getProductDetailService = async (productId) => {
  try {
    const product = await Product.findOne({
      where: { id: productId },
      include: {
        model: Category,
        attributes: ["name"],
      },
    });
    if (!product) {
      return { code: 404, message: "Sản phẩm không tồn tại!", data: null };
    }
    return {
      code: 200,
      message: "Lấy thông tin sản phẩm thành công!",
      data: product,
    };
  } catch (err) {
    console.log("🚀 ~ getProductDetailService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const addProductService = async (data) => {
  console.log("🚀 ~ addProductService ~ data:", data);
  try {
    if (!data.name || !data.price || !data.image || !data.stock) {
      return { code: 400, message: "Thiếu thông tin sản phẩm!", data: null };
    }

    const newProduct = await Product.create(data);

    return {
      message: "Thêm sản phẩm thành công!",
      code: 201,
      data: newProduct,
    };
  } catch (err) {
    console.log("🚀 ~ addProductService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const editProductService = async (id, data) => {
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return { code: 404, message: "Không tìm thấy sản phẩm!", data: null };
    }
    await product.update(data);

    return {
      message: "Cập nhật sản phẩm thành công!",
      code: 201,
      data: product,
    };
  } catch (err) {
    console.log("🚀 ~ editProductService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const deleteProductService = async (id) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return { code: 404, message: "Không tìm thấy sản phẩm!" };
    }
    await product.destroy();

    return { code: 200, message: "Xóa sản phẩm thành công!" };
  } catch (err) {
    console.log("🚀 ~ deleteProductService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};
const getAllProductsWithoutAccessoriesService = async ({
  activeSortKeys,
  priceRange,
  categoryId,
}) => {
  try {
    const MAX_PRICE = 10_000_000;
    const min = priceRange?.min >= 0 ? Number(priceRange.min) : 0;
    const max =
      priceRange?.max <= MAX_PRICE ? Number(priceRange.max) : MAX_PRICE;

    let order = [];
    const sortMap = {
      alphabetAZ: ["name", "ASC"],
      alphabetZA: ["name", "DESC"],
      priceAsc: ["price", "ASC"],
      priceDesc: ["price", "DESC"],
      dateOld: ["createdAt", "ASC"],
      dateNew: ["createdAt", "DESC"],
    };

    for (const key of activeSortKeys || []) {
      if (sortMap[key]) order.push(sortMap[key]);
    }

    const whereCondition = {
      price: {
        [Op.gte]: min,
        [Op.lte]: max,
      },
    };

    if (categoryId !== undefined) {
      if (categoryId === 14) {
        whereCondition.category_id = 14;
      } else {
        whereCondition.category_id = categoryId;
      }
    } else {
      whereCondition.category_id = { [Op.ne]: 14 }; // Không truyền => lấy tất cả trừ phụ kiện
    }

    const products = await Product.findAll({
      where: whereCondition,
      order,
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });

    if (!products || products.length === 0) {
      return { code: 404, message: "Không có sản phẩm nào!", data: [] };
    }
    return {
      message: "Lấy danh sách sản phẩm thành công!",
      code: 201,
      data: products,
    };
  } catch (err) {
    console.log("🚀 ~ getAllProductsWithoutAccessoriesService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const getNewestProductsService = async () => {
  try {
    const products = await Product.findAll({
      where: {
        status: {
          [Op.eq]: "Active",
        },
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    // const newproducts = products.filter((p) => p.status === "Active");

    if (!products || products.length === 0) {
      return { code: 404, message: "Không có sản phẩm nào!", data: [] };
    }
    return {
      message: "Lấy 10 sản phẩm mới nhất thành công!",
      code: 201,
      data: products,
    };
  } catch (err) {
    console.log("🚀 ~ getNewestProductsService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};
module.exports = {
  getAllProductsService,
  getProductDetailService,
  addProductService,
  editProductService,
  deleteProductService,
  getAllProductsWithoutAccessoriesService,
  getNewestProductsService,
};
