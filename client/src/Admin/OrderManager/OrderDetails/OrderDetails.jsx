import React, { useEffect, useState } from "react";
import "./OrderDetails.scss";
import { getDetailOrder } from "../../../services/orderService";

const OrderDetails = ({ order, onBack }) => {
  console.log("🚀 ~ OrderDetails ~ order:", order);
  const [orderDetail, setOrderDetail] = useState([]);
  const getDetails = async (id) => {
    try {
      const res = await getDetailOrder(id);
      if (res.data.code === 201) {
        setOrderDetail(res.data.data);
      }
    } catch (error) {
      console.log("🚀 ~ getDetailOrder ~ getOrders:", error);
    }
  };

  useEffect(() => {
    if (order.id) {
      getDetails(order.id);
    }
  }, [order.id]);

  return (
    <div className="OrderDetailsDiv">
      <div className="OrderInfoDiv">
        <div className="OrderDetailsHead">
          <p style={{ paddingLeft: "5px" }}>Thông tin đơn hàng</p>
          <button
            onClick={onBack}
            style={{
              border: "1px solid white",
              borderRadius: "5px",
              backgroundColor: "black",
              color: "white",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            {" "}
            Trở về{" "}
          </button>
        </div>
        <div className="OrderDetailsBody">
          <p style={{ paddingLeft: "10px" }}>
            <strong>
              &#8226; <span style={{ paddingLeft: "10px" }}>Mã đơn:</span>
            </strong>{" "}
            {orderDetail?.id}
          </p>
          <p style={{ paddingLeft: "10px" }}>
            <strong>
              &#8226; <span style={{ paddingLeft: "10px" }}>Khách hàng:</span>
            </strong>{" "}
            {orderDetail?.username}
          </p>
          <p style={{ paddingLeft: "10px" }}>
            <strong>
              &#8226;{" "}
              <span style={{ paddingLeft: "10px" }}>Địa chỉ giao hàng:</span>
            </strong>{" "}
            {orderDetail?.address}
          </p>
          <p style={{ paddingLeft: "10px" }}>
            <strong>
              &#8226; <span style={{ paddingLeft: "10px" }}>Ngày đặt:</span>
            </strong>{" "}
            {order?.order_date}
          </p>
          <p style={{ paddingLeft: "10px" }}>
            <strong>
              &#8226; <span style={{ paddingLeft: "10px" }}>Trạng thái:</span>
            </strong>{" "}
            {orderDetail?.status}
          </p>
          <p style={{ paddingLeft: "10px" }}>
            <strong>
              &#8226; <span style={{ paddingLeft: "10px" }}>Tổng tiền:</span>
            </strong>{" "}
            {orderDetail?.total}
          </p>
        </div>
        <div className="OrderDetailsProductsList">
          <p style={{ paddingLeft: "5px" }}>Danh sách sản phẩm trong đơn </p>
          <table width="100%" border="1px white solid">
            <thead>
              <tr>
                <td>Sản phẩm</td>
                <td>Số lượng</td>
                <td>Đơn giá</td>
                <td>Thành tiền</td>
              </tr>
            </thead>
            <tbody>
              {orderDetail?.Products?.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.OrderDetail.quantity}</td>
                  <td>{product.price.toLocaleString("vi-VN")}</td>
                  <td>
                    {(
                      product.OrderDetail.quantity * product.OrderDetail.price
                    ).toLocaleString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="CustomerDetailsHead">
            <p style={{ paddingLeft: "5px" }}>Thông tin khách hàng </p>
          </div>
          <div className="CustomerDetailsBody">
            <p style={{ paddingLeft: "10px" }}>
              <strong>
                &#8226; <span style={{ paddingLeft: "10px" }}>Tên:</span>
              </strong>{" "}
              {order?.User.username}
            </p>
            <p style={{ paddingLeft: "10px" }}>
              <strong>
                &#8226; <span style={{ paddingLeft: "10px" }}>Email:</span>
              </strong>{" "}
              {order?.User?.email}
            </p>
            <p style={{ paddingLeft: "10px" }}>
              <strong>
                &#8226; <span style={{ paddingLeft: "10px" }}>SĐT:</span>
              </strong>{" "}
              {order?.User?.phone}
            </p>
            <p style={{ paddingLeft: "10px" }}>
              <strong>
                &#8226; <span style={{ paddingLeft: "10px" }}>Địa chỉ:</span>
              </strong>{" "}
              {order?.address ? order?.address : "..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
