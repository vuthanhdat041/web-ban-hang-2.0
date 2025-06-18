const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
require("dotenv").config();
const { sequelize } = require("../config/dbConfig");
const jwt = require("jsonwebtoken");

const registerService = async ({ username, email, password, phone }) => {
  try {
    let existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return { message: "Email đã tồn tại!", code: 400 };
    }
    const existingPhone = await User.findOne({ where: { phone } });
    if (existingPhone) {
      return { code: 400, message: "Số điện thoại đã được sử dụng!" };
    }
    let hashedPassword = await hashPassword(password);
    let newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
    });
    return { message: "Đăng ký thành công!", code: 201, data: [] };
  } catch (err) {
    console.log("🚀 ~ registerService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { code: 401, message: "Email hoặc mật khẩu không chính xác!" };
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return { code: 401, message: "Email hoặc mật khẩu không chính xác!" };
    }

    // Tạo token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role_id: user.role_id,
        status: user.status,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const { password: _, ...userData } = user.toJSON();
    return {
      code: 200,
      message: "Đăng nhập thành công!",
      token,
      data: [],
    };
  } catch (err) {
    console.log("🚀 ~ loginService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

module.exports = {
  registerService,
  loginService,
};
