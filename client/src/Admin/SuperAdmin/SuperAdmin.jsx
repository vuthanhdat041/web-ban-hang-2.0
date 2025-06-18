import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./SuperAdmin.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { getAllOrdersByDate, getRevenue } from "../../services/orderService";
import SalesChart from "../../components/SalesChart/SalesChart";
const SuperAdmin = () => {
  const [filter, setFilter] = useState("day");
  const [salesByDate, setSalesByDate] = useState([]);
  const [dataForChart, setDataForChart] = useState([]);
  console.log("🚀 ~ SuperAdmin ~ dataForChart:", dataForChart);

  console.log("🚀 ~ SuperAdmin ~ salesByDate:", salesByDate);

  const handleFilterChange = async (e) => {
    setFilter(e.target.value);
    await getOrdersByDate(e.target.value);
    // Gọi API hoặc cập nhật dữ liệu tùy theo lựa chọn
  };

  const getOrdersByDate = async (filter) => {
    try {
      const res = await getAllOrdersByDate(filter);

      if (res.data.code === 201) {
        setSalesByDate(res.data.data);
        const chartData = res.data.data
          .filter((order) => order.status === "Đã giao hàng") // lọc đơn hàng đã giao
          .map((order) => ({
            date: new Date(order.order_date).toLocaleDateString("vi-VN"), // format ngày theo kiểu Việt Nam
            total: order.total,
          }));

        setDataForChart(chartData);
      }
    } catch (error) {
      console.log("🚀 ~ getOrdersByDate ~ error:", error);
    }
  };
  useEffect(() => {
    getOrdersByDate(filter);
  }, []);

  const deliveredOrders = salesByDate.filter(
    (salesByDate) => salesByDate.status === "Đã giao hàng"
  );
  const productStats = {};

  salesByDate.forEach((order) => {
    order.Products.forEach((p) => {
      const { id, name, image } = p;
      const quantity = p.OrderDetail.quantity;

      if (!productStats[id]) {
        productStats[id] = { id, name, image, totalQuantity: 0 };
      }
      productStats[id].totalQuantity += quantity;
    });
  });

  const mostSold = Object.values(productStats).sort(
    (a, b) => b.totalQuantity - a.totalQuantity
  )[0];

  const data = [
    {
      title: "Tổng đơn",
      value: salesByDate?.length,
      // change: "+14.3%",
      // changeClass: "up",
    },
    {
      title: "Đã giao thành công",
      value: deliveredOrders.length,
      // change: "-48.3%",
      // changeClass: "down",
    },

    {
      title: "Đơn ở trạng thái khác",
      value: salesByDate?.length - deliveredOrders.length,
      // change: "0%",
      // changeClass: "neutral",
    },
    {
      title: "Sản phẩm bán được nhiều nhất",
      productName: mostSold?.name,
      productImage: mostSold?.image,
      quantity: mostSold?.totalQuantity,
      // change: "0%",
      // changeClass: "neutral",
    },
  ];
  return (
    <div className="superAdminContainer">
      <div className="overview">
        <div className="dashboard">
          <div className="filter-bar">
            <label htmlFor="timeFilter">📅 Bộ lọc:</label>
            <select
              className="select"
              id="timeFilter"
              value={filter}
              onChange={handleFilterChange}
              // style={{
              //   color: "black",
              //   backgroundColor: "#fab31f",
              // }}
            >
              <option value="day">7 Ngày gần nhất</option>
              <option value="month">12 Tháng gần nhất</option>
              <option value="year">Các năm</option>
            </select>
          </div>
          {data.map((item, index) => (
            <div className="card" key={index}>
              <div className="title">{item.title}</div>

              {item.productImage ? (
                <div className="product">
                  <img src={item.productImage} alt="product" />
                  <div className="info">
                    <div className="name">{item.productName}</div>
                    <div className="quantity">{item.quantity}</div>
                  </div>
                </div>
              ) : item.productName ? (
                <>
                  <div className="name">{item.productName}</div>
                  <div className="value">{item.value}</div>
                </>
              ) : item.shopName ? (
                <>
                  <div className="shop">{item.shopName}</div>
                  <div className="value">{item.value}</div>
                </>
              ) : (
                <div className="value">{item.value}</div>
              )}

              <div className={`change ${item.changeClass}`}>{item.change}</div>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-2">Biểu đồ doanh thu</h2>
      <SalesChart dataForChart={dataForChart} filter={filter} />
    </div>
  );
};

export default SuperAdmin;
