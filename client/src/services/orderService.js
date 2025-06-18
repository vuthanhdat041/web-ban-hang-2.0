import api from "../utils/axiosConfig";

const getAllOrders = (condition) => api.post("/order/getAllOrders", condition);
const getDetailOrder = (id) => api.get(`/order/${id}`);
const getOrderUser = (id) => api.get(`/order/userCart/${id}`);
const updateOrderStatus = (id, data) => api.put(`/order/${id}/status`, data);
const addToCart = (product) => api.post("/order/add", product);
const deleteCart = (data) => api.delete("/order/delete", { data });

const getDetailOrderUser = (id) => api.get(`/order/user/${id}`);
const statusAfterPayment = (id, address) =>
  api.put(`/order/${id}/statusAfterPayment`, { address });

const getRevenue = () => api.get(`/order/reports/revenue`);

const getAllOrdersByDate = (filter) =>
  api.get("/order/getAllOrdersByDate", { params: { filter } });

const quickBuyProduct = (product, address) =>
  api.post("/order/quickBuy", { product, address });

export {
  getAllOrders,
  getDetailOrder,
  updateOrderStatus,
  getOrderUser,
  addToCart,
  deleteCart,
  statusAfterPayment,
  getDetailOrderUser,
  getRevenue,
  getAllOrdersByDate,
  quickBuyProduct,
};
