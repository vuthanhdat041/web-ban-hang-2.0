import React, { useContext, useEffect, useState } from "react";
import "./Account.scss";
import { UserContext } from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import { getDetailOrderUser } from "../../services/orderService";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

const Account = () => {
  const [active, setActive] = useState("account");
  const { logoutContext } = useContext(UserContext);
  const { user } = useContext(UserContext);

  const [order, setOrder] = useState([]);
  // console.log("🚀 ~ Account ~ order:", order);

  const getDetails = async (id) => {
    try {
      const res = await getDetailOrderUser(id);
      // console.log("🚀 ~ getDetails ~ res:", res.data.data);
      if (res.data.code === 201) {
        setOrder(res.data.data);
      }
    } catch (error) {
      console.log("🚀 ~ getDetails ~ error:", error);
    }
  };

  useEffect(() => {
    getDetails(user?.id);
  }, [user?.id]);
  return (
    <div className="accountContainer">
      <div className="left">
        <div className="contentAccount">
          <div className="userInfor">
            <div className="header">
              <img src="/img/avatar.jpeg" alt="Avatar" className="avatar" />

              <div className="user-info">
                <p>
                  Xin chào, <span className="bold">{user?.username}</span>
                </p>
                <p className="email">{user?.email}</p>
              </div>
              <button onClick={() => logoutContext()} className="logout">
                Đăng xuất
              </button>
            </div>
            <div className="contentt">
              <p>
                Tổng chi tiêu: <span className="float-right">0 VND</span>
              </p>
              <p>
                Hạng — <span className="bold">MEMBER</span>{" "}
                <span className="float-right">Điểm — 0</span>
              </p>
            </div>
            <div className="divider"></div>
            <p className="status">
              Cần tiêu thêm <span className="bold">3.000.000 VND</span> để lên
              hạng
              <span className="bold"> SILVER</span>.
            </p>
          </div>
          <div className="menu">
            <div
              className={`menu-item ${active === "account" ? "active" : ""}`}
              onClick={() => setActive("account")}
            >
              TÀI KHOẢN
            </div>
            <div
              className={`menu-item ${active === "orders" ? "active" : ""}`}
              onClick={() => setActive("orders")}
            >
              ĐƠN HÀNG
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="contentAccount">
          <h2>{active === "account" ? "Chi tiết tài khoản" : "Đơn hàng"}</h2>
          {active === "account" ? (
            <div className="detailAccount">
              <h3>
                Họ và tên:
                <a style={{ fontWeight: "normal", fontSize: "1rem" }}>
                  {" "}
                  {user?.username}
                </a>
              </h3>
              <h3>
                Số điện thoại:
                <a style={{ fontWeight: "normal", fontSize: "1rem" }}>
                  {" "}
                  {user?.phone}
                </a>
              </h3>
              <h3>
                Email:
                <a style={{ fontWeight: "normal", fontSize: "1rem" }}>
                  {" "}
                  {user?.email}
                </a>
              </h3>
              <h3>
                Địa chỉ:
                <a style={{ fontWeight: "normal", fontSize: "1rem" }}>
                  {" "}
                  {user?.address}
                </a>
              </h3>
              <button className="editButton">
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/account/addresses"
                >
                  Sửa thông tin
                </NavLink>
              </button>
            </div>
          ) : (
            // "No orders found."
            <>
              {order.map((item) => (
                <OrderSummary key={item.id} order={item} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
