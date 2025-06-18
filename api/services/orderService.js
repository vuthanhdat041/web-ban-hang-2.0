const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const OrderDetail = require("../models/OrderDetail");
const Category = require("../models/Category");
const moment = require("moment");
const { Op, where } = require("sequelize");

const getAllOrdersService = async (condition) => {
  try {
    let whereCondition = {};

    if (condition === "Đã giao hàng") {
      whereCondition.status = "Đã giao hàng";
    } else {
      whereCondition.status = {
        [Op.ne]: "Đã giao hàng", // Tất cả trừ "Đã giao hàng"
      };
    }

    const orders = await Order.findAll({
      where: whereCondition,
      include: [
        {
          model: User,
          attributes: ["id", "username", "email", "phone", "address"], // Chỉ lấy thông tin cần thiết
        },
      ],
      order: [["order_date", "DESC"]], // Sắp xếp đơn hàng mới nhất trước
    });
    if (orders.length === 0) {
      return { code: 404, message: "Không có đơn hàng nào!", data: [] };
    }
    return {
      message: "Lấy danh sách đơn hàng thành công!",
      code: 201,
      data: orders,
    };
  } catch (err) {
    console.log("🚀 ~ getAllOrdersService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const getOrderDetailService = async (orderId) => {
  try {
    const order = await Order.findOne({
      where: { id: orderId },
      include: [
        {
          model: User,
          attributes: ["id", "username", "email", "phone", "address"], // Lấy thông tin khách hàng
        },
        {
          model: Product,
          attributes: ["id", "name", "price"],

          through: {
            attributes: ["quantity", "price"], // từ OrderDetail
          },
        },
      ],
    });

    if (!order) {
      console.log("Không tìm thấy đơn hàng!");

      return { code: 201, message: "Không tìm thấy đơn hàng!", data: "" };
    }
    return {
      message: "Lấy danh sách đơn hàng thành công!",
      code: 201,
      data: order,
    };
  } catch (err) {
    console.log("🚀 ~ getOrderDetailService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const getCartUserService = async (userId) => {
  try {
    const order = await Order.findAll({
      where: { user_id: userId, status: "Đang chọn hàng" },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "image"],
          through: {
            attributes: ["quantity", "price"], // từ OrderDetail
          },
        },
      ],
    });

    if (!order) {
      console.log("❌ Không tìm thấy đơn hàng!");

      return { code: 201, message: "Không tìm thấy đơn hàng!", data: "" };
    }
    return {
      message: "Lấy danh sách đơn hàng thành công!",
      code: 201,
      data: order,
    };
  } catch (err) {
    console.log("🚀 ~ getOrderDetailService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const updateOrderStatusService = async (orderId, newStatus) => {
  try {
    const order = await Order.findByPk(orderId);

    if (!order) {
      return { code: 404, message: "Không tìm thấy đơn hàng!", data: "" };
    }
    const validStatuses = [
      "Chờ xác nhận",
      "Đã xác nhận",
      "Đang giao hàng",
      "Đã giao hàng",
      "Đã hủy",
    ];
    if (!validStatuses.includes(newStatus)) {
      return {
        code: 400,
        message: "Trạng thái đơn hàng không hợp lệ!",
        data: "",
      };
    }
    order.status = newStatus;
    await order.save();
    return {
      message: "Lấy danh sách đơn hàng thành công!",
      code: 201,
      data: order,
    };
  } catch (err) {
    console.log("🚀 ~ updateOrderStatusService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const addToCartService = async (data) => {
  try {
    const { user_id, product_id, quantity, price } = data;

    if (!user_id || !product_id || !quantity || !price) {
      return {
        code: 400,
        message: "Thiếu dữ liệu đầu vào",
      };
    }
    let order = await Order.findOne({
      where: {
        user_id,
        status: "Đang chọn hàng",
      },
    });
    if (!order) {
      order = await Order.create({
        user_id,
        total: 0, // Tổng sẽ được tính sau
        status: "Đang chọn hàng",
        address: "", // Có thể bỏ trống hoặc điền sau
      });
    }

    const product = await Product.findByPk(product_id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID ${product_id} not found` });
    }

    let existingDetail = await OrderDetail.findOne({
      where: {
        order_id: order.id,
        product_id,
      },
    });
    let DetailOrder;
    let total = parseFloat(order.total) || 0;

    if (existingDetail) {
      const newQuantity = existingDetail.quantity + quantity;
      const newPrice = price;

      await existingDetail.update({
        quantity: newQuantity,
        price: newPrice,
      });

      DetailOrder = existingDetail;
      total += price * quantity;
    } else {
      DetailOrder = await OrderDetail.create({
        order_id: order.id,
        product_id,
        quantity,
        price,
      });

      total += price * quantity;
    }
    await order.update({ total });

    return {
      message: "thêm đơn hàng thành công!",
      code: 201,
      data: { DetailOrder, order },
    };
  } catch (err) {
    console.log("🚀 ~ addToCartService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const quickBuyService = async (product, address) => {
  try {
    const { user_id, product_id, quantity, price } = product;

    if (!user_id || !product_id || !quantity || !price) {
      return {
        code: 400,
        message: "Thiếu dữ liệu đầu vào",
      };
    }

    let order = await Order.create({
      user_id,
      total: quantity * price, // Tổng sẽ được tính sau
      status: "Chờ xác nhận",
      address: address, // Có thể bỏ trống hoặc điền sau
    });
    let DetailOrder = await OrderDetail.create({
      order_id: order.id,
      product_id,
      quantity,
      price,
    });

    return {
      message: "thêm đơn hàng thành công!",
      code: 201,
      data: {
        order,
        DetailOrder,
      },
    };
  } catch (err) {
    console.log("🚀 ~ quickBuyService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const deleteCartService = async (order_id, product_id) => {
  try {
    // Lấy chi tiết đơn hàng để tính toán giá trị sản phẩm bị xóa
    const orderDetail = await OrderDetail.findOne({
      where: {
        order_id,
        product_id,
      },
    });

    // Nếu không tìm thấy chi tiết đơn hàng, trả về thông báo lỗi
    if (!orderDetail) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy chi tiết đơn hàng" });
    }

    // Kiểm tra nếu giá trị price và quantity là số hợp lệ
    const price = parseFloat(orderDetail.price);
    const quantity = parseInt(orderDetail.quantity, 10);

    if (isNaN(price) || isNaN(quantity)) {
      return res
        .status(400)
        .json({ message: "Giá hoặc số lượng sản phẩm không hợp lệ" });
    }

    // Xóa chi tiết đơn hàng
    const deleted = await OrderDetail.destroy({
      where: {
        order_id,
        product_id,
      },
    });

    // Kiểm tra kết quả xóa
    if (deleted === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy chi tiết đơn hàng" });
    }

    // Lấy tổng giá trị hiện tại của đơn hàng
    const order = await Order.findOne({
      where: { id: order_id },
    });

    // Kiểm tra nếu total trong order là số hợp lệ
    let currentTotal = parseFloat(order.total);
    if (isNaN(currentTotal)) {
      return res.status(400).json({ message: "Tổng đơn hàng không hợp lệ" });
    }

    // Tính lại tổng giá trị đơn hàng sau khi xóa sản phẩm
    let newTotal = currentTotal - price * quantity;

    // Kiểm tra nếu newTotal là số hợp lệ
    if (isNaN(newTotal) || newTotal < 0) {
      return res
        .status(400)
        .json({ message: "Tổng đơn hàng không hợp lệ sau khi xóa sản phẩm" });
    }

    // Cập nhật lại tổng giá trị đơn hàng
    await order.update({ total: newTotal });

    // Kiểm tra số lượng sản phẩm còn lại trong đơn hàng
    const remainingItems = await OrderDetail.count({
      where: { order_id },
    });

    // Nếu không còn sản phẩm nào trong đơn hàng, xóa đơn hàng
    if (remainingItems === 0) {
      await Order.destroy({ where: { id: order_id } });

      return {
        message: `Đơn hàng ${order_id} đã được xoá vì không còn sản phẩm.`,
        code: 201,
        data: [],
      };
    }

    // Trả về thông báo xóa thành công và tổng đơn hàng đã được cập nhật
    return {
      message: "Xoá thành công và tổng đơn hàng đã được cập nhật",
      code: 201,
      data: [],
    };
  } catch (err) {
    // Bắt lỗi hệ thống
    console.log("🚀 ~ deleteCartService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const statusAfterPaymentService = async (orderId, address) => {
  try {
    const order = await Order.findByPk(orderId);

    if (!order) {
      return { code: 404, message: "Không tìm thấy đơn hàng!", data: "" };
    }
    if (order.status !== "Đang chọn hàng") {
      return res.status(400).json({ message: "Đơn hàng không thể thanh toán" });
    }
    order.status = "Chờ xác nhận";
    order.address = address;
    await order.save();
    return {
      message: "Thanh toán thành công, đơn hàng đang chờ xác nhận",
      code: 201,
      data: order,
    };
  } catch (err) {
    console.log("🚀 ~ updateOrderStatusService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const getOrderDetailUserService = async (orderId) => {
  try {
    const order = await Order.findAll({
      where: {
        user_id: orderId,

        status: {
          [Op.ne]: "Đang chọn hàng",
        },
      },
      attributes: ["id", "total", "order_date", "status"],
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "image"],
          through: {
            attributes: ["quantity", "price"],
          },
          include: [
            {
              model: Category,
              attributes: ["name"], // lấy name từ Category
            },
          ],
        },
      ],
    });

    if (!order) {
      return { code: 201, message: "Không tìm thấy đơn hàng!", data: "" };
    }
    return {
      message: "Lấy danh sách đơn hàng thành công!",
      code: 201,
      data: order,
    };
  } catch (err) {
    console.log("🚀 ~ getOrderDetailUserService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};
const getRevenueService = async () => {
  try {
    let data = await Order.findAll({
      attributes: ["total", "order_date"], // Chỉ lấy cột 'total' và 'order_date'
      where: {
        status: "Đã giao hàng", // Điều kiện status là 'Đã giao hàng'
      },
    });
    return {
      message: "Lấy dữ liệu doanh thu thành công!",
      code: 200, // Thường là 200 cho GET request thành công
      data: data,
    };
  } catch (err) {
    // Bắt lỗi hệ thống
    console.log("🚀 ~ getRevenueService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const getAllOrdersByDateService = async (filter) => {
  try {
    let whereClause = {};

    const now = moment();
    if (filter === "day") {
      const startDate = moment().subtract(6, "days").startOf("day"); // 7 ngày gần nhất (hôm nay + 6 ngày trước)
      const endDate = moment().endOf("day");

      whereClause.order_date = {
        [Op.between]: [startDate.toDate(), endDate.toDate()],
      };
    } else if (filter === "month") {
      const startDate = moment().subtract(11, "months").startOf("month"); // 12 tháng gần nhất
      const endDate = moment().endOf("month");

      whereClause.order_date = {
        [Op.between]: [startDate.toDate(), endDate.toDate()],
      };
    } else if (filter === "year") {
      // Không cần điều kiện - lấy tất cả
    }

    const orders = await Order.findAll({
      where: whereClause,
      attributes: ["order_date", "total", "status"],
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "image"],

          through: {
            attributes: ["quantity", "price"], // từ OrderDetail
          },
        },
      ],
    });
    if (orders.length === 0) {
      return { code: 404, message: "Không có đơn hàng nào!", data: [] };
    }
    return {
      message: "Lấy danh sách đơn hàng thành công!",
      code: 201,
      data: orders,
    };
  } catch (err) {
    console.log("🚀 ~ getAllOrdersByDateService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

module.exports = {
  getAllOrdersService,
  getOrderDetailService,
  updateOrderStatusService,
  getCartUserService,
  addToCartService,
  deleteCartService,
  statusAfterPaymentService,
  getOrderDetailUserService,
  getRevenueService,
  getAllOrdersByDateService,
  quickBuyService,
};
