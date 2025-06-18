import api from "../utils/axiosConfig";

const getAllProduct = (condition) =>
  api.post("/product/getAllProduct", condition);
const getAllProductWithoutAccessories = (condition) =>
  api.post("/product/getAllProductWithoutAccessories", condition);

const getProductDetail = (id) => api.get(`/product/getById/${id}`);
const editInforProduct = (id, productData) =>
  api.put(`/product/${id}`, productData);
const deleteProduct = (id) => api.delete(`/product/${id}`);
const addProduct = (data) => api.post(`/product/addProduct`, data);
const getNewestProduct = () => api.get("/product/getNewestProduct");

export {
  getAllProduct,
  getProductDetail,
  editInforProduct,
  deleteProduct,
  addProduct,
  getAllProductWithoutAccessories,
  getNewestProduct,
};
