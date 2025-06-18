import api from "../utils/axiosConfig";

const getProfile = () => api.get("/user/getProfile");
const updateAddressService = (data) => api.put("/user/update-address", data);

const getAllUser = () => api.get("/user/getAll");
const getDetailUser = (userId) => api.get(`/user/detail/${userId}`);

const updateUserStatus = (userId, status) =>
  api.put(`/user/status/${userId}`, { status });

export {
  getProfile,
  updateAddressService,
  getAllUser,
  getDetailUser,
  updateUserStatus,
};
