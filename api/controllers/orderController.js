const orderService = require("../services/orderService");

const getAllOrdersController = async (req, res) => {
  try {
    const condition = req.body;
    let data = await orderService.getAllOrdersService(condition?.filter);

    return res.status(data.code).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ getAllOrdersController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const getOrderDetailController = async (req, res) => {
  try {
    const { id } = req.params;

    let data = await orderService.getOrderDetailService(id);

    return res.status(data.code).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ getOrderDetailController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const updateOrderStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🚀 ~ updateOrderStatusController ~ id:", id);
    const { status } = req.body;
    console.log("🚀 ~ updateOrderStatusController ~ status:", status);

    let data = await orderService.updateOrderStatusService(id, status);
    return res.status(200).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ updateOrderStatusController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const getCartUserController = async (req, res) => {
  try {
    const { id } = req.params;

    let data = await orderService.getCartUserService(id);

    return res.status(200).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ getOrderUserController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const addToCartController = async (req, res) => {
  try {
    const product = req.body;
    let data = await orderService.addToCartService(product);

    return res.status(200).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ addToCartController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const quickBuyController = async (req, res) => {
  try {
    const { product, address } = req.body;
    let data = await orderService.quickBuyService(product, address);

    return res.status(200).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ quickBuyService ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const deleteCartController = async (req, res) => {
  try {
    const { order_id, product_id } = req.body;

    let data = await orderService.deleteCartService(order_id, product_id);

    return res.status(200).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ deleteCartController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const statusAfterPaymentController = async (req, res) => {
  try {
    const { id } = req.params;
    let { address } = req.body;
    console.log("🚀 ~ statusAfterPaymentController ~ address:", address);

    let data = await orderService.statusAfterPaymentService(id, address);
    return res.status(200).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ updateOrderStatusController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const getOrderDetailUserController = async (req, res) => {
  try {
    const { id } = req.params;

    let data = await orderService.getOrderDetailUserService(id);

    return res.status(data.code).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ getOrderDetailUserController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};
const getRevenueController = async (req, res) => {
  try {
    let data = await orderService.getRevenueService();

    return res.status(data.code).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ getRevenueController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const getAllOrdersByDateController = async (req, res) => {
  try {
    const filter = req.query.filter;
    console.log("🚀 ~ getAllOrdersByDateController ~ filter:", filter);
    let data = await orderService.getAllOrdersByDateService(filter);
    return res.status(data.code).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ getAllOrdersByDateController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};
module.exports = {
  getAllOrdersController,
  getOrderDetailController,
  updateOrderStatusController,
  getCartUserController,
  addToCartController,
  deleteCartController,
  statusAfterPaymentController,
  getOrderDetailUserController,
  getRevenueController,
  getAllOrdersByDateController,
  quickBuyController,
};
