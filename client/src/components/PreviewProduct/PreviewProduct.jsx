// Preview.jsx
import React, { useContext, useState } from "react";
import "./PreviewProduct.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";

// Images served from public/images

const Preview = ({ maxPrice = 9000000 }) => {
  /*giá trị max của thanh giá màu vàng*/
  // const [current, setCurrent] = useState(0);
  const [qty, setQty] = useState(1);
  const location = useLocation();
  const product = location.state?.product;
  console.log("🚀 ~ Preview ~ product:", product);
  const { addToCartContext } = useContext(CartContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [addStatus, setAddStatus] = useState("idle");
  // idle | adding | added
  const priceValue = 2385000;
  const percent = Math.min(100, Math.max(0, (priceValue / maxPrice) * 100));

  // const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  // const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));
  const handleQuickAdd = async () => {
    setAddStatus("adding");
    if (!user.user) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }
    const quickAddData = {
      user_id: user?.user?.id,
      product_id: product.id,
      quantity: qty,
      price: product.price,
    };
    setTimeout(async () => {
      let res = await addToCartContext(quickAddData);
      if (res.data.code === 201) {
        setAddStatus("added");
        setTimeout(() => setAddStatus("idle"), 1000);
      }
    }, 1500);
  };

  const quickBuy = () => {
    console.log("🚀 ~ quickBuy ~ product:", product);

    navigate("/checkout", {
      state: {
        item: {
          user_id: user?.user?.id,
          product_id: product.id,
          quantity: qty,
          image: product.image,
          price: product.price,
          name: product.name,
        },
        isQuickBuy: true,
      },
    });
  };

  return (
    <div className="preview-page">
      <button className="close-btn" onClick={() => window.history.back()}>
        ×
      </button>

      <div className="gallery">
        {/* <div className="thumbnails">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`thumb-${i}`}
              className={i === current ? "active" : ""}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div> */}
        <div className="main-image">
          {/* <button className="nav prev" onClick={prev}>
            ‹
          </button> */}
          <img src={product?.image} />
          {/* <button className="nav next" onClick={next}>
            ›
          </button> */}
        </div>
      </div>

      <div className="details">
        <h1>{product?.name}</h1>
        <p className="price">{product?.price.toLocaleString("vi-VN")} VND</p>
        <div className="stock-bar">
          <div className="fill" style={{ width: `${percent}%` }}></div>
        </div>
        <p className="stock-text">{product?.stock} trong kho</p>

        <div className="purchase-panel">
          <div className="quantity">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <button
            className={`btn add ${addStatus !== "idle" ? "disabled" : ""}`}
            onClick={handleQuickAdd}
          >
            {addStatus === "adding"
              ? "Đang thêm..."
              : addStatus === "added"
              ? "Đã thêm"
              : "Thêm vào giỏ hàng"}
          </button>
        </div>
        <button onClick={() => quickBuy()} className="btn buy">
          Mua ngay
        </button>

        <p style={{ whiteSpace: "pre-wrap" }} className="note">
          {product?.description}
        </p>
      </div>
    </div>
  );
};

export default Preview;

// preview.scss
// (giữ nguyên như trước)
