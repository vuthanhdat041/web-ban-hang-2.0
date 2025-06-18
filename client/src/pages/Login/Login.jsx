import "./Login.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { loginService } from "../../services/authService";
import { getProfile } from "../../services/userService";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const { loginContext } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Xóa lỗi khi nhập lại
  };

  const validate = () => {
    let newErrors = {};
    if (!formData?.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData?.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    return newErrors;
  };
  const handleLogin = async (email, password) => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get("redirect");

    try {
      const res = await await loginService({ email, password });
      if (res.code === 200) {
        loginContext(null, res.token);

        const profileRes = await getProfile(); // api gọi /profile
        console.log("🚀 ~ handleLogin ~ profileRes:", profileRes);
        if (profileRes) {
          loginContext(profileRes?.data?.data, res.token);
        }

        if (redirectPath) {
          navigate(redirectPath);
        } else {
          navigate("/");
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          password: res.message,
        }));
      }
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ handleLogin:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Đăng nhập</h2>

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
            type="password"
            name="password"
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

        {/* <a href="#" className="forgot-password">Quên mật khẩu?</a> */}

        <button
          className="login-button"
          onClick={() => handleLogin(formData?.email, formData?.password)}
        >
          ĐĂNG NHẬP
        </button>
        <div className="extra-links">
          <NavLink style={{ color: "white" }} to="/register">
            Tạo tài khoản
          </NavLink>

          <NavLink style={{ color: "white" }} to="/">
            Quay lại cửa hàng
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
