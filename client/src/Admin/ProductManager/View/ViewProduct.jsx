import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./viewProduct.scss";
import { getProductDetail } from "../../../services/productService";

const ViewProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const handleGetDetailProduct = async () => {
    try {
      const res = await getProductDetail(productId);
      console.log("🚀 ~ handleGetDetailProduct ~ res:", res);

      if (res.data.code === 200) {
        console.log(res.data.data);
        setProduct(res.data.data);
      }
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ handleLogin:", error);
    }
  };
  useEffect(() => {
    handleGetDetailProduct();
  }, [productId]);

  if (!product) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="product-detail-container">
      <h1>Chi tiết sản phẩm</h1>
      <div className="product-card">
        <img
          src={product.image || "default-image.jpg"}
          alt={product.name}
          className="product-image"
        />
        <div className="product-info">
          <p>
            <strong>ID:</strong> {product.id}
          </p>
          <p>
            <strong>Tên:</strong> {product.name}
          </p>
          <p>
            <strong>Giá:</strong>{" "}
            {product.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <p>
            <strong>Số lượng tồn kho:</strong> {product.stock}
          </p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            <span
              className={
                product.status === "Active"
                  ? "status-active"
                  : "status-inactive"
              }
            >
              {product.status}
            </span>
          </p>
          <p>
            <strong>Mô tả:</strong> {product.description}
          </p>
        </div>
      </div>
      <Link to="/homeAdmin/productManager" className="btn-back">
        Quay lại
      </Link>
    </div>
  );
};

export default ViewProduct;
