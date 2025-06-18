import React, { useEffect, useState } from "react";
import "./OrderList.scss";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../../services/orderService";

const OrderList = ({ onView }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("Đã giao hàng");
  console.log("🚀 ~ OrderList ~ filter:", filter);

  const [searchTerm, setSearchTerm] = useState("");
  const statuses = [
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang giao hàng",
    "Đã giao hàng",
    "Đã hủy",
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const itemsPerPage = 8;

  const handleSearchClick = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const filteredOrders = orders.filter((order) =>
    order.User.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleEdit = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, editing: !order.editing, tempStatus: order.status }
          : order
      )
    );
  };
  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, tempStatus: newStatus } : order
      )
    );
    console.log("🚀 ~ handleStatusChange ~ newStatus:", newStatus);
  };

  const saveStatus = async (id) => {
    const order = orders.find((o) => o.id === id);
    if (order) {
      console.log("🚀 ~ saveStatus ~ id:", id, "newStatus:", order.tempStatus);
      await updateStatus(id, { status: order.tempStatus });
      toggleEdit(id);
      getOrders();
    }
  };

  const handleView = (order) => {
    onView(order);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const nextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  const getOrders = async (filter) => {
    try {
      const res = await getAllOrders({ filter });
      if (res.data.code === 201) {
        const formattedOrders = res.data.data.map((order) => ({
          ...order,
          order_date: new Date(order.order_date).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
        }));
        setOrders(formattedOrders);
      }
    } catch (error) {
      console.log("🚀 ~ getOrders ~ getOrders:", error);
    }
  };
  const updateStatus = async (id, data) => {
    try {
      const res = await updateOrderStatus(id, data);
      console.log("🚀 ~ updateStatus ~ res:", res);
      if (res.data.code === 201) {
      }
    } catch (error) {
      console.log("🚀 ~ updateStatus ~ updateStatus:", error);
    }
  };

  useEffect(() => {
    getOrders(filter);
  }, [filter]);

  return (
    <div className="OrderListDiv">
      <div className="SearchDiv">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên khách hàng..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="SearchInput"
        />
        <button className="SearchButton" onClick={handleSearchClick}>
          Tìm kiếm
        </button>
      </div>
      <select
        style={{ marginBottom: "20px" }}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="Đã giao hàng">Đã giao hàng</option>
        <option value="other">Các trạng thái còn lại</option>
      </select>
      <table border="1" width="80%">
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order?.id}</td>
              <td>{order?.User.username}</td>
              <td>{order?.order_date}</td>
              <td>{order?.total}</td>
              <td>
                {order.editing ? (
                  <select
                    value={order.tempStatus}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  order.status
                )}
              </td>
              <td>
                <button onClick={() => handleView(order)}>Xem</button>
                {order.editing ? (
                  <button onClick={() => saveStatus(order.id)}>Lưu</button>
                ) : (
                  <button onClick={() => toggleEdit(order.id)}>Cập nhật</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Trang trước
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default OrderList;
