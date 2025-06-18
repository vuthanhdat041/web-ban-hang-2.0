import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./editProduct.scss";
import {
  editInforProduct,
  getProductDetail,
} from "../../../services/productService";
import { getAllCategories } from "../../../services/categoryService";

function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null); // Xem trước ảnh mới

  const handleGetDetailProduct = async () => {
    try {
      const res = await getProductDetail(productId);
      if (res.data.code === 200) {
        setProduct(res.data.data);
      }
    } catch (error) {
      console.log("🚀 ~ handleGetDetailProduct ~ error:", error);
    }
  };
  const getCategories = async () => {
    try {
      const res = await getAllCategories();
      if (res.data.code === 201) {
        console.log("🚀 ~ getCategories ~ res.data.code:", res.data);
        setCategories(res.data.data);
      }
    } catch (error) {
      console.log("🚀 ~ getCategories ~ getCategories:", error);
    }
  };

  const editProduct = async (productId, product) => {
    try {
      const res = await editInforProduct(productId, product);
      if (res.data.code === 201) {
        setCategories(res.data.data);
        navigate("/homeAdmin/productManager");
      }
    } catch (error) {
      console.log("🚀 ~ editProduct ~ editProduct:", error);
    }
  };

  useEffect(() => {
    handleGetDetailProduct();
    getCategories();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setProduct({ ...product, image: imageUrl });
    }
  };
  const handleCancel = () => {
    navigate("/homeAdmin/productManager");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await editProduct(productId, product);
  };

  if (!product) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="edit-product-container">
      <h1>Chỉnh sửa sản phẩm</h1>
      <form onSubmit={handleSubmit} className="edit-product-form">
        <div>
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mô tả:</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Giá:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
          <p>
            <strong>Giá hiển thị:</strong>{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
          </p>
        </div>

        <div>
          <label>Hình ảnh:</label>
          {/* <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleImageChange}
          />
          {preview && (
            <img src={preview} alt="Preview" className="image-preview" />
          )} */}
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Danh mục:</label>
          <select
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Chọn danh mục</option>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option>Không có danh mục</option>
            )}
          </select>
        </div>

        <div>
          <label>Số lượng tồn kho:</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div>
          <label>Trạng thái:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="status"
                value="Active"
                checked={product.status === "Active"}
                onChange={handleChange}
              />
              Còn hàng
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={product.status === "Inactive"}
                onChange={handleChange}
              />
              Hết hàng
            </label>
          </div>
        </div>

        <button type="submit" className="btn-update">
          Cập nhật
        </button>
        <button type="button" className="btn-cancel" onClick={handleCancel}>
          Huỷ
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
