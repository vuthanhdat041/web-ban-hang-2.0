const User = require("../models/User");
const Order = require("../models/Order");

const getProfileService = async (user) => {
  try {
    if (!user) {
      return res.status(500).json({
        message: '"Không có ttin user',
        code: 200,
        data: [],
      });
    }
    return {
      message: "Lấy profile khách hàng thành công!",
      code: 201,
      data: user,
    };
  } catch (err) {
    console.log("🚀 ~ getProfileService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const getAllUsersService = async () => {
  try {
    let users = await User.findAll({ where: { role_id: 5 } });
    if (!users) {
      return res.status(500).json({
        message: '"Không có khách hàng nào',
        code: 404,
        data: [],
      });
    }
    return {
      message: "Lấy danh sách khách hàng thành công!",
      code: 201,
      data: users,
    };
  } catch (err) {
    console.log("🚀 ~ getAllUsersService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const updateUserStatusService = async (id, status) => {
  console.log("🚀 ~ updateUserStatusService ~ status:", status);
  console.log("🚀 ~ updateUserStatusService ~ id:", id);
  try {
    const validStatuses = ["Hoạt động", "Đã khóa"];
    if (!validStatuses.includes(status)) {
      return { code: 400, message: "Giá trị status không hợp lệ!" };
    }
    // Tìm user
    const user = await User.findByPk(id);
    if (!user) {
      return { code: 404, message: "Không tìm thấy người dùng!" };
    }

    await user.update({ status });
    return { code: 200, message: "Cập nhật trạng thái thành công!" };
  } catch (err) {
    console.log("🚀 ~ updateUserStatusService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const detailUserAndHistoryOrderService = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Order,
        order: [["order_date", "DESC"]],
      },
    });
    if (!user) {
      return { code: 404, message: "Không tìm thấy người dùng!", data: "" };
    }
    return { code: 200, message: "Lấy dữ liệu thành công!", data: user };
  } catch (err) {
    console.log("🚀 ~ detailUserAndHistoryOrderService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const searchUserByNameAndPhoneService = async (keyword) => {
  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("username")),
            "LIKE",
            `%${keyword.toLowerCase()}%`
          ),
          { phone: { [Op.like]: `%${keyword}%` } },
        ],
      },
    });
    if (users.length === 0) {
      return { code: 404, message: "Không tìm thấy người dùng!", data: [] };
    }

    return { code: 200, message: "Tìm kiếm thành công!", data: users };
  } catch (err) {
    console.log("🚀 ~ searchUserByNameAndPhoneService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const updateUserAddressService = async (userId, address) => {
  try {
    const updatedUser = await User.update(
      { address: address },
      { where: { id: userId } }
    );
    console.log("🚀 ~ updateUserAddressService ~ updatedUser:", updatedUser);
    if (!updatedUser) {
      return { code: 404, message: "Không thấy user" };
    }

    return { code: 200, message: "Tìm kiếm thành công!", data: address };
  } catch (err) {
    console.log("🚀 ~ supdateUserAddressService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

module.exports = {
  getProfileService,
  getAllUsersService,
  updateUserStatusService,
  detailUserAndHistoryOrderService,
  searchUserByNameAndPhoneService,
  updateUserAddressService,
};
