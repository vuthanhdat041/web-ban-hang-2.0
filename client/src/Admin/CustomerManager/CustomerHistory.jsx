import React, { useEffect, useState } from "react";
import "./CustomerHistory.scss";
import { getDetailUser } from "../../services/userService";
import { NavLink, useParams } from "react-router-dom";

const OrderHistory = () => {
  // if (!customer) {
  //   return (
  //     <div>
  //       <p>Không tìm thấy thông tin khách hàng.</p>
  //       <button onClick={onBack} className="back-btn">
  //         Quay lại
  //       </button>
  //     </div>
  //   );
  // }
  const [customer, setCustomer] = useState([]);
  const [Orders, setOrders] = useState([]);

  console.log("🚀 ~ OrderHistory ~ customer:", customer);
  const { userId } = useParams();
  const convertToVietnamTime = (isoDateStr) => {
    const date = new Date(isoDateStr);
    return date.toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getDetail = async (userId) => {
    try {
      const res = await getDetailUser(userId);

      if (res.data.code === 200) {
        setCustomer(res.data.data);
        setOrders(res.data.data.Orders);
      }
    } catch (error) {
      console.log("🚀 ~ getDetail ~ error:", error);
    }
  };
  useEffect(() => {
    getDetail(userId);
  }, []);
  return (
    <div className="customerHistoryContainer">
      <h2>Lịch sử đơn hàng của {customer?.username}</h2>
      <ul className="customer-details">
        <li>
          <strong>Username:</strong> {customer?.username}
        </li>
        <li>
          <strong>Email:</strong> {customer?.email}
        </li>
        <li>
          <strong>Số điện thoại:</strong> {customer?.phone}
        </li>
        <li>
          <strong>Địa chỉ:</strong> {customer?.address}
        </li>
        <li>
          <strong>Trạng thái:</strong>{" "}
          <span
            className={
              customer?.status === "Hoạt động"
                ? "status-active"
                : "status-blocked"
            }
          >
            {customer?.status}
          </span>
        </li>
        <li>
          <strong>Ngày tạo:</strong> {convertToVietnamTime(customer?.createdAt)}
        </li>
      </ul>

      <h3 className="kaka">Đơn hàng</h3>
      <table className="order-table">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {Orders.length > 0 ? (
            Orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.id}</td>
                <td>{convertToVietnamTime(order.order_date)}</td>
                <td>{order.total.toLocaleString()} VNĐ</td>
                <td>{order.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Chưa có đơn hàng nào.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* <button className="back-btn">Quay lại</button> */}

      <NavLink
        className="back-btn"
        style={{ textDecoration: "none", color: "white" }}
        exact
        to={`/homeAdmin/customerManager`}
      >
        Quay lại
      </NavLink>
    </div>
  );
};

export default OrderHistory;
