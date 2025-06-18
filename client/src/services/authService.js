import api from "../utils/axiosConfig";

const registerService = (data) => api.post("/auth/register", data);

const loginService = async (data) => {
  try {
    const res = await api.post("/auth/login", data);
    if (res.data.code === 200) {
      // Lưu token vào localStorage
      localStorage.setItem("token", res.data.token);
    }
    return res.data;
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    throw error;
  }
};

export { registerService, loginService };
