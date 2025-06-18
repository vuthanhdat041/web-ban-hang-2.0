import React, { useEffect, useState } from "react";
import "./CustomerManager.scss";
import { getAllUser, updateUserStatus } from "../../services/userService";
import { NavLink } from "react-router-dom";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  // console.log("🚀 ~ CustomerManagement ~ customers:", customers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const toggleStatus = async (customer) => {
    console.log("🚀 ~ toggleStatus ~ id:", customer);
    // customer.status = customer.status === "Hoạt động" ? "Đã khóa" : "Hoạt động";
    await updateStatus(
      customer.id,
      customer.status === "Hoạt động" ? "Đã khóa" : "Hoạt động"
    );
    // setCustomers(
    //   customers.map((customer) =>
    //     customer.id === id
    //       ? {
    //           ...customer,
    //           // status: customer.status === "active" ? "locked" : "active",
    //           status: customer.status === "active" ? "Đã khóa" : "Hoạt động",
    //         }
    //       : customer
    //   )

    // );
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      (filter === "all" || customer.status === filter) &&
      (customer?.username.includes(search) ||
        customer?.username.includes(search) ||
        customer?.phone.includes(search))
  );

  const getAllUsers = async () => {
    try {
      const res = await getAllUser();

      if (res.data.code === 201) {
        setCustomers(res.data.data);
      }
    } catch (error) {
      console.log("🚀 ~ getAllUsers ~ error:", error);
    }
  };
  const updateStatus = async (id, status) => {
    try {
      const res = await updateUserStatus(id, status);
      console.log("🚀 ~ updateStatus ~ res:", res);

      if (res.data.code === 200) {
        getAllUsers();
      }
    } catch (error) {
      console.log("🚀 ~ updateStatus ~ error:", error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="customer-management">
      <h1>Quản lý Khách hàng</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Tìm kiếm theo số điện thoại"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <>Nhấn vào tên để xem thông tin chi tiết</>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="Hoạt động">Hoạt động</option>
          <option value="Đã khóa">Đã khóa</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>SDT</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                <NavLink
                  style={{ textDecoration: "none", color: "white" }}
                  exact
                  to={`/homeAdmin/customerManager/detail/${customer.id}`}
                >
                  {" "}
                  {customer.username}
                </NavLink>
              </td>
              <td>{customer?.email}</td>
              <td>{customer?.phone}</td>
              <td>{customer?.address}</td>
              <td className={customer?.status}>
                {/* {customer.status === "Hoạt động" ? "Hoạt động" : "Đã khóa"} */}
                {customer.status}
              </td>
              <td>
                <button
                  // onClick={() => toggleStatus(customer?.id)}
                  onClick={() => toggleStatus(customer)}
                  className={customer?.status}
                >
                  {/* {customer.status === "active" ? "🔒 Khóa" : "🔓 Mở khóa"} */}
                  {customer.status === "Hoạt động" ? "🔒 Khóa" : "🔓 Mở khóa"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;
