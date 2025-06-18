import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./create.scss";
import { getAllCategories } from "../../../services/categoryService";
import { addProduct } from "../../../services/productService";

const Create = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category_id: "",
    stock: "",
    status: "Active",
  });
  const [categories, setCategories] = useState([]);
  // console.log("🚀 ~ Create ~ categories:", categories);

  const [preview, setPreview] = useState(null);
  const getCategories = async () => {
    try {
      const res = await getAllCategories();
      if (res.data.code === 201) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.log("🚀 ~ getCategories ~ getCategories:", error);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setValues({ ...values, image: imageUrl });
    }
  };

  const addProductt = async (data) => {
    try {
      const res = await addProduct(data);
      console.log("🚀 ~ addProductt ~ res:", res);
      if (res.data.code === 201) {
        navigate("/homeAdmin/productManager");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("🚀 ~ addProductt ~ addProductt:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedValues = {
      ...values,
      price: Number(values.price),
      stock: Number(values.stock),
      category_id: Number(values.category_id),
    };
    console.log("🚀 ~ handleSubmit ~ values:", updatedValues);
    addProductt(updatedValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleCancel = () => {
    navigate("/homeAdmin/productManager");
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="create-container">
      <h1>Thêm sản phẩm</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Tên:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>

        <div>
          <label>Giá:</label>
          <input
            type="number"
            name="price"
            className="form-control"
            onChange={(e) => setValues({ ...values, price: e.target.value })}
          />
        </div>
        <div>
          <label>Danh mục:</label>
          <select
            name="category_id"
            value={values.category_id}
            className="form-control"
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
            className="form-control"
            onChange={(e) => setValues({ ...values, image: e.target.value })}
          />
        </div>

        <div>
          <label>Mô tả:</label>
          <textarea
            name="description"
            className="form-control"
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
          />
        </div>

        <div>
          <label>Số lượng:</label>
          <input
            type="number"
            name="stock"
            min="0"
            className="form-control"
            onChange={(e) => setValues({ ...values, stock: e.target.value })}
          />
        </div>

        <div>
          <label>Trạng thái:</label>
          <div>
            <label>
              <input
                type="radio"
                name="status"
                value="Active"
                checked={values.status === "Active"}
                onChange={(e) =>
                  setValues({ ...values, status: e.target.value })
                }
              />
              Còn hàng
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={values.status === "Inactive"}
                onChange={(e) =>
                  setValues({ ...values, status: e.target.value })
                }
              />
              Hết hàng
            </label>
          </div>
        </div>

        <button type="submit" className="btn-submit">
          Thêm
        </button>
        <button type="button" className="btn-cancel" onClick={handleCancel}>
          Hủy
        </button>
      </form>
    </div>
  );
};

export default Create;
