const authService = require("../services/authService");

const registerController = async (req, res) => {
  try {
    let { username, email, password, phone } = req.body;

    // check rỗng
    if (!username || !email || !password || !phone) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin bắt buộc!", code: 400 });
    }
    //check định dạng email
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Email không hợp lệ!", code: 400 });
    }
    // check độ dài pass
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Mật khẩu phải có ít nhất 6 ký tự!", code: 400 });
    }
    // check số điện thoại (chỉ chứa 10 số)
    let phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({ message: "Số điện thoại không hợp lệ!", code: 400 });
    }

    let data = await authService.registerService({
      username,
      email,
      password,
      phone,
    });

    return res.status(data.code).json({
      message: data.message,
      code: data.code,
      data: data.data,
    });
  } catch (err) {
    console.log("🚀 ~ registerController ~ err:", err);

    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Thiếu email hoặc mật khẩu!", code: 400 });
    }
    let data = await authService.loginService(email, password);
    return res.status(200).json({
      message: data.message,
      code: data.code,
      data: data.data,
      token: data.token,
    });
  } catch (err) {
    console.log("🚀 ~ loginController ~ err:", err);
    return res.status(500).json({
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
