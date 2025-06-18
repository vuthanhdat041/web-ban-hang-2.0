import React, { useContext, useState } from "react";
import "./OrderSummary.scss";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import CartPopup from "../PopUpCartItem/PopUpCart";

const OrderSummary = ({ order }) => {
  const { addToCartContext, fetchCartContext } = useContext(CartContext);

  const user = useContext(UserContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const vnTime = new Date(order.order_date).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const closeCart = () => setIsCartOpen(false);
  const buyAgain = async (products) => {
    console.log("🚀 ~ constbuyAgain ~ product:", products);
    for (let item of products.Products) {
      const quickAddData = {
        user_id: user?.user?.id,
        product_id: item?.id,
        quantity: 1,
        price: item?.price,
      };
      // console.log("🚀 ~ buyAgain ~ quickAddData:", quickAddData);

      try {
        const res = await addToCartContext(quickAddData);
      } catch (err) {
        console.log("🚀 ~ buyAgain ~ err:", err);
      }
    }
    alert("Đã thêm lại vào giỏ hàng");
    // setIsCartOpen(true);
  };

  return (
    <div className="order-summary">
      <div style={{ margin: "10px 0" }}>Mã đơn hàng: {order.id} </div>
      <div>Ngày đặt: {vnTime}</div>

      {order.Products.map((product) => (
        <div key={product.id} className="product">
          <img
            src={product?.image || "https://via.placeholder.com/100"} // dùng ảnh nếu có
            alt={product?.name}
            className="product-img"
          />
          <div className="product-info">
            <p className="product-title">{product.name}</p>
            <span className="product-option">
              Phân loại hàng: {product?.Category?.name || "Không có"}
            </span>
            <span className="product-qty">
              x{product.OrderDetail?.quantity || 1}
            </span>
          </div>
          <div className="product-price">₫{product.price.toLocaleString()}</div>
        </div>
      ))}

      <div className="total">
        <span>Thành tiền:</span>
        <span className="total-price">₫{order.total.toLocaleString()}</span>
      </div>

      <div className="actions">
        <span>Trạng thái: {order.status}</span>
        {order?.status === "Đã giao hàng" && (
          <button className="btn buy-again" onClick={() => buyAgain(order)}>
            Mua Lại
          </button>
        )}
      </div>
      {isCartOpen && <CartPopup onClose={closeCart} />}
    </div>
  );
};

export default OrderSummary;
