import "./Register.scss";
import { NavLink } from "react-router-dom";
import { registerService, loginService } from "../../services/authService";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { getProfile } from "../../services/userService";

const Register = () => {
  const navigate = useNavigate();
  const { loginContext } = useContext(UserContext);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Xóa lỗi khi nhập lại
  };

  const validate = () => {
    let newErrors = {};

    if (!formData?.username.trim()) {
      newErrors.username = "Vui lòng nhập tên";
    }

    if (!formData?.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData?.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData?.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^\d{9,11}$/.test(formData?.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ ";
    }

    if (!formData?.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData?.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    return newErrors;
  };

  const handleLogin = async (email, password) => {
    try {
      const res = await await loginService({ email, password });
      console.log("🚀 ~ handleLogin ~ res:", res);

      if (res.code === 200) {
        loginContext(null, res.token);

        const profileRes = await getProfile(); // api gọi /profile
        if (profileRes) {
          loginContext(profileRes?.data?.data, res.token);
        }

        navigate("/");
      }
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ handleLogin:", error);
    }
  };

  const handleRegister = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const res = await registerService(formData);

      if (res.data.code === 201) {
        await handleLogin(formData.email, formData.password);
      }
    } catch (error) {
      console.log("🚀 ~ handleRegister ~ handleRegister:", error);
      setErrors({
        ...errors,
        form: error.response?.data?.message || "Lỗi đăng ký, thử lại!",
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Đăng kí</h2>

        <div className="input-group">
          <input
            type="text"
            name="username" // ✅ Thêm name vào input
            placeholder="Tên"
            className="input-field"
            value={formData.username}
            onChange={handleChange}
          />
          {errors?.username && (
            <p className="error-message">{errors.username}</p>
          )}
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email" // ✅ Thêm name vào input
            placeholder="Email"
            className="input-field"
            value={formData?.email}
            onChange={handleChange}
          />
          {errors?.email && <p className="error-message">{errors?.email}</p>}
        </div>

        <div className="input-group">
          <input
            type="tel"
            name="phone" // ✅ Thêm name vào input
            placeholder="Số điện thoại"
            className="input-field"
            value={formData?.phone}
            onChange={handleChange}
          />
          {errors?.phone && <p className="error-message">{errors?.phone}</p>}
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password" // ✅ Thêm name vào input
            placeholder="Mật khẩu"
            className="input-field"
            value={formData?.password}
            onChange={handleChange}
          />
          {errors?.password && (
            <p className="error-message">{errors?.password}</p>
          )}
        </div>

        {errors?.form && <p className="error-message">{errors?.form}</p>}

        <button className="register-button" onClick={handleRegister}>
          Tạo tài khoản
        </button>
        <div className="extra-links">
          <NavLink style={{ color: "white" }} to="/">
            Quay lại cửa hàng
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
