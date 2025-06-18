import api from "../utils/axiosConfig";

const getAllCategories = () => api.get("/category/getAllCategories");
const addCategory = (data) => api.post("/category/addCategory", data);
const deleteCategory = (id) => api.delete(`/category/${id}`);

export { getAllCategories, addCategory, deleteCategory };
