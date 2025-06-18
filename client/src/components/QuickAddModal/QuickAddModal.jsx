import React, { useState, useEffect } from "react";
import "./QuickAddModal.scss";
import CartPopup from "../PopUpCartItem/PopUpCart";

const QuickAddModal = ({ show, onClose, product, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const add = async () => {
    let res = await onConfirm({ quantity, product });
    if (res?.data?.code === 201) {
      setIsCartOpen(true);
    }

    console.log("🚀 ~ add ~ res:", res);
  };
  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
    if (show) {
      setQuantity(1); // reset quantity về 1 khi modal mở lại
    }
  }, [show]);
  if (!show) return null;

  return (
    <div className="quick-add-overlay">
      <div className="quick-add-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="modal-content">
          <img className="img" src={product.image} alt={product.name} />
          <div className="info">
            <h2>{product.name}</h2>
            <p className="price">{product?.price.toLocaleString()} VND</p>

            <div className="quantity">
              <p>Số lượng:</p>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>

            <button
              className="confirm-btn"
              onClick={() => {
                add();
              }}
            >
              Thêm vào giỏ
            </button>
          </div>
          {isCartOpen && <CartPopup onClose={closeCart} />}
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;
