import React, { useEffect, useState } from "react";
import axios from "axios";
import "./category.scss";
import { Link } from "react-router-dom";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
} from "../../../services/categoryService";

function Category() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState(""); // Tên danh mục
  const [newCategoryDescription, setNewCategoryDescription] = useState(""); // Mô tả danh mục

  const getCategories = async () => {
    try {
      const res = await getAllCategories();
      if (res.data.code === 201) {
        console.log("🚀 ~ getCategories ~ res.data.code:", res.data);
        setCategories(res.data.data);
      }
    } catch (error) {
      console.log("🚀 ~ getCategories ~ Category:", error);
    }
  };

  const addCategories = async (data) => {
    try {
      const res = await addCategory(data);
      console.log("🚀 ~ addCategories ~ res:", res);
      if (res.data.code === 201) {
        getCategories();
        setNewCategoryName("");
        setNewCategoryDescription("");
      }
    } catch (error) {
      console.log("🚀 ~ addCategories ~ Category:", error);
    }
  };
  const delCategory = async (id) => {
    try {
      const res = await deleteCategory(id);
      if (res.data.code === 200) {
        getCategories();
      }
    } catch (error) {
      console.log("🚀 ~ delCategory ~ Category:", error);
    }
  };
  // Lấy danh sách category từ API
  useEffect(() => {
    getCategories();
  }, []);

  // Thêm danh mục mới
  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryData = {
      name: newCategoryName,
      description: newCategoryDescription,
    };

    if (categoryData) {
      addCategories(categoryData);
    }
    // Thực hiện gửi dữ liệu lên server hoặc xử lý thêm ở đây
  };

  const handleDeleteCategory = async (id) => {
    console.log("🚀 ~ handleDeleteCategory ~ id:", id);
    await delCategory(id);
  };

  return (
    <div className="category-container">
      <h1>Quản lý danh mục</h1>
      <div className="add-category">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nhập tên danh mục"
            />
            <input
              type="text"
              value={newCategoryDescription}
              onChange={(e) => setNewCategoryDescription(e.target.value)}
              placeholder="Nhập mô tả"
            />
          </div>
          <button type="submit" className="btn-add">
            Thêm
          </button>
        </form>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/homeAdmin/productManager" className="btn-back">
        Quay lại
      </Link>
    </div>
  );
}

export default Category;
