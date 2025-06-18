import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./productManager.scss";
import { deleteProduct, getAllProduct } from "../../services/productService";
import { ProductContext } from "../../context/ProductContext";
import { getAllCategories } from "../../services/categoryService";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);

  // Lấy danh sách sản phẩm & danh mục

  const handleGetAllProduct = async (filter) => {
    try {
      const res = await getAllProduct({ categoryId: filter });

      if (res.data.code === 201) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.log("🚀 ~ handleGetAllProduct ~ handleGetAllProduct:", error);
    }
  };

  const deleteProductbyId = async (id) => {
    try {
      const res = await deleteProduct(id);

      if (res.data.code === 200) {
        await handleGetAllProduct();
      }
    } catch (error) {
      console.log("🚀 ~ deleteProductbyId ~ deleteProductbyId:", error);
    }
  };
  // Xóa sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      await deleteProductbyId(id);
    }
  };
  const getCategories = async () => {
    try {
      const res = await getAllCategories();
      if (res.data.code === 201) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.log("🚀 ~ getCategories ~ Category:", error);
    }
  };

  useEffect(() => {
    getCategories();
    handleGetAllProduct(filter);
  }, [filter]);

  return (
    <div className="home-container">
      <h1>Quản lý sản phẩm</h1>

      {/* Nút Danh mục & Thêm sản phẩm */}
      <div className="btn-group">
        <Link
          to="/homeAdmin/productManager/categoryProduct"
          className="btn btn-category"
        >
          Danh mục
        </Link>
        <Link to="/homeAdmin/productManager/create" className="btn btn-add">
          Thêm sản phẩm
        </Link>
      </div>
      <div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Tất cả</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Danh mục</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price.toLocaleString()} VND</td>
                  <td>{product.Category.name}</td>
                  <td>{product.stock}</td>
                  <td
                    className={
                      product.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {product.status === "Active" ? "Còn hàng" : "Hết hàng"}
                  </td>
                  <td className="action-buttons">
                    <Link
                      to={`/homeAdmin/productManager/viewProduct/${product.id}`}
                      className="btn btn-read"
                    >
                      Xem
                    </Link>
                    <Link
                      to={`/homeAdmin/productManager/editProduct/${product.id}`}
                      className="btn btn-edit"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-delete"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManager;
