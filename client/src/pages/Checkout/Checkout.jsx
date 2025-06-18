import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./checkout_style.scss";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import {
  getOrderUser,
  quickBuyProduct,
  statusAfterPayment,
} from "../../services/orderService";
import { CartContext } from "../../context/CartContext";

const Checkout = () => {
  // const [selectedMethod, setSelectedMethod] = useState("zalo");
  const [country, setCountry] = useState("Việt Nam");
  const [city, setCity] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const { cart, order } = useContext(CartContext);
  const [addressToDelivery, setAddressToDelivery] = useState("");
  const user = useContext(UserContext);
  const [selected, setSelected] = useState("default");

  const navigate = useNavigate();

  const updateStatus = async (id, address) => {
    try {
      const res = await statusAfterPayment(id, address);
      if (res.data.code === 201) {
        navigate("/checkout/success");
      }
    } catch (error) {
      console.log("🚀 ~ updateStatus ~ error:", error);
    }
  };
  useEffect(() => {
    setAddressToDelivery(user?.user?.address);
  }, []);

  const quickBuy = async (item, address) => {
    try {
      const res = await quickBuyProduct(item, address);
      console.log("🚀 ~ quickBuy ~ res:", res);
      if (res.data.code === 201) {
        navigate("/checkout/success");
      }
    } catch (error) {
      console.log("🚀 ~ quickBuy ~ error:", error);
    }
  };

  // const fullAddress = `${addressInput}, ${city}, ${country}`;
  const handlePayment = () => {
    const isUsingDefault = selected === "default";
    const isUsingOther = selected === "other";

    // Kiểm tra giỏ hàng rỗng khi không phải mua nhanh
    if (!isQuickBuy && cart.length === 0) {
      alert("Không có sản phẩm để thanh toán");
      return;
    }

    // Kiểm tra địa chỉ
    let finalAddress = "";

    if (isUsingDefault) {
      if (!addressToDelivery?.trim()) {
        alert("Không có địa chỉ để thanh toán");
        return;
      }
      finalAddress = addressToDelivery;
    } else if (isUsingOther) {
      if (!addressInput.trim() || !city.trim() || !country.trim()) {
        alert("Vui lòng nhập đầy đủ địa chỉ, thành phố và quốc gia.");
        return;
      }
      finalAddress = `${addressInput}, ${city}, ${country}`;
    }

    // Gọi đúng API tùy theo chế độ
    if (isQuickBuy) {
      quickBuy(item, finalAddress);
    } else {
      updateStatus(order?.id, finalAddress);
    }
  };
  const location = useLocation();

  const { item, isQuickBuy } = location.state || {};
  console.log("🚀 ~ Checkout ~ item:", item);

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Liên hệ</h2>
          <input
            type="text"
            placeholder="Email hoặc số điện thoại di động"
            value={user?.user?.email}
          />

          <h2>Giao hàng</h2>
          <div
            className={`address ${selected === "default" ? "active" : ""}`}
            onClick={() => setSelected("default")}
          >
            Địa chỉ mặc định :{" "}
            {user?.user?.address ? user?.user?.address : "Chưa setting"}
          </div>
          <div
            className={`anotherAddress ${selected === "other" ? "active" : ""}`}
            onClick={() => setSelected("other")}
          >
            Sử dụng địa chỉ khác{" "}
          </div>
          {selected === "other" && (
            <div className="custom-address-form">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option>Việt Nam</option>
                <option>Hoa Kỳ</option>
                <option>Nhật Bản</option>
              </select>

              <div className="name-fields">
                <input
                  className="last-name"
                  type="text"
                  placeholder="Tên"
                  value={user?.user?.username || ""}
                />
                {/* <input className="first-name" type="text" placeholder="Họ" /> */}
              </div>

              <div className="addres">
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                />
              </div>

              <div className="city-fields">
                <input
                  type="text"
                  placeholder="Thành phố"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Mã bưu chính (không bắt buộc)"
                />
              </div>
            </div>
          )}

          <button className="pay-button" onClick={handlePayment}>
            Thanh toán ngay
          </button>
        </div>

        <div className="checkout-summary">
          {isQuickBuy ? (
            <div className="summary-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <p>
                  {item.name} (x{item.quantity})
                </p>
              </div>
              <p className="price">{item.price.toLocaleString("vi-VN")} đ</p>
            </div>
          ) : (
            cart?.map((item) => (
              <div className="summary-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <p>
                    {item.name} (x{item.OrderDetail.quantity})
                  </p>
                </div>
                <p className="price">
                  {item.OrderDetail.price.toLocaleString("vi-VN")} đ
                </p>
              </div>
            ))
          )}

          <input type="text" placeholder="Mã giảm giá hoặc thẻ quà tặng" />
          <button>Áp dụng</button>
          <div className="summary">
            <div className="tong-phu">
              <p className="text1">Tổng phụ:</p>{" "}
              <p>{order?.total?.toLocaleString("vi-VN")} đ</p>
            </div>
            <div className="van-chuyen">
              <p className="text2">Vận chuyển:</p> <p>MIỄN PHÍ</p>
            </div>
            <div className="tong">
              <h3 className="text3">Tổng:</h3>{" "}
              <h3>{order?.total?.toLocaleString("vi-VN")} đ</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
