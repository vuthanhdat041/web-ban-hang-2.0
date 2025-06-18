import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./SalesChart.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { getRevenue } from "../../services/orderService";
const SalesChart = ({ dataForChart, filter }) => {
  console.log("🚀 ~ SalesChart ~ dataForChart:", dataForChart, filter);
  // const [rawData, setRawData] = useState([]);
  // const getRevenues = async () => {
  //   try {
  //     const res = await getRevenue();
  //     console.log("🚀 ~ getRevenues ~ res:", res.data.data);
  //     if (res.data.code === 200) {
  //       const rawData = res.data.data.map((item) => {
  //         const dateObject = new Date(item.order_date);
  //         const formattedDate = dateObject.toISOString().split("T")[0]; // Sử dụng toISOString() để đảm bảo UTC day
  //         return {
  //           date: formattedDate,
  //           price: item.total,
  //         };
  //       });
  //       setRawData(rawData);
  //     }
  //   } catch (error) {
  //     console.log("🚀 ~ getRevenues ~ error:", error);
  //   }
  // };
  // useEffect(() => {
  //   getRevenues();
  // }, []);
  // const aggregatedData = useMemo(() => {
  //   const monthlyTotals = {};
  //   const uniqueYears = new Set(); // Để lưu trữ các năm có trong dữ liệu

  //   rawData?.forEach((item) => {
  //     uniqueYears.add(item.date.substring(0, 4)); // Lấy "YYYY" từ "YYYY-MM-DD"
  //   });

  // Array.from(uniqueYears)
  //   .sort()
  //   .forEach((year) => {
  //     for (let i = 1; i <= 12; i++) {
  //       const monthKey = `${year}-${i.toString().padStart(2, "0")}`; // VD: "2024-01", "2025-01"
  //       monthlyTotals[monthKey] = {
  //         monthLabel: `T${i}/${year.toString().substring(2)}`, // VD: "T1/24", "T1/25"
  //         revenue: 0,
  //       };
  //     }
  //   });

  // rawData?.forEach((item) => {
  //   const monthKey = item.date.substring(0, 7); // "YYYY-MM"
  //   const price = parseFloat(item.price);

  //   if (monthlyTotals[monthKey]) {
  //     monthlyTotals[monthKey].revenue += price;
  //   }
  // });

  //   return Object.keys(monthlyTotals)
  //     .sort()
  //     .map((key) => monthlyTotals[key]);
  // }, [rawData]);
  // console.log("🚀 ~ aggregatedData ~ aggregatedData:", aggregatedData);

  const columnWidth = 100;
  const minChartDisplayWidth = 800;
  // const dynamicChartWidth = Math.max(
  //   minChartDisplayWidth
  //   // aggregatedData.length * columnWidth
  // );

  const scrollContainerRef = useRef(null);

  // Sử dụng useEffect để cuộn đến cuối (phía năm gần nhất) sau khi render
  // useEffect(() => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollLeft =
  //       scrollContainerRef.current.scrollWidth;
  //   }
  // }, [aggregatedData]); // Cuộn lại khi dữ liệu tổng hợp thay đổi
  const today = new Date();

  let filteredData = [];
  if (filter === "day") {
    const revenueMap = {};
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString("vi-VN");
      last7Days.push(label);
      revenueMap[label] = 0;
    }

    dataForChart.forEach((item) => {
      const [day, month, year] = item.date.split("/").map(Number);
      const d = new Date(year, month - 1, day);
      const label = d.toLocaleDateString("vi-VN");

      if (last7Days.includes(label)) {
        revenueMap[label] += item.total;
      }
    });

    filteredData = last7Days.map((label) => ({
      monthLabel: label,
      revenue: revenueMap[label],
    }));
  } else if (filter === "month") {
    const now = new Date();
    const monthlyRevenue = {};

    // Chuẩn bị 12 tháng gần nhất (có thể từ tháng 7/2024 → 6/2025)
    const months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      monthlyRevenue[key] = 0;
      return { key, label: `Tháng ${d.getMonth() + 1}/${d.getFullYear()}` };
    });

    dataForChart.forEach((item) => {
      const [day, month, year] = item.date.split("/").map(Number);
      const key = `${year}-${String(month).padStart(2, "0")}`;
      if (monthlyRevenue[key] !== undefined) {
        monthlyRevenue[key] += item.total;
      }
    });

    filteredData = months.map(({ key, label }) => ({
      monthLabel: label,
      revenue: monthlyRevenue[key],
    }));
  } else if (filter === "year") {
    const yearRevenue = {};

    dataForChart.forEach((item) => {
      const [day, month, year] = item.date.split("/").map(Number);
      yearRevenue[year] = (yearRevenue[year] || 0) + item.total;
    });

    filteredData = Object.entries(yearRevenue).map(([year, revenue]) => ({
      monthLabel: `Năm ${year}`,
      revenue,
    }));
  }

  const dynamicChartWidth = Math.max(
    minChartDisplayWidth,
    filteredData.length * columnWidth
  );

  return (
    // <div>
    //   {rawData?.length == 0 ? (
    //     <div>Chưa có doanh thu</div>
    //   ) : (
    //     <div className="chart">
    //       <div
    //         className="editScroll"
    //         ref={scrollContainerRef}
    //         style={{
    //           height:
    //             "calc(100% + 17px)" /* 17px là chiều cao điển hình của thanh cuộn trên Windows */,
    //           overflowX: "auto",
    //           overflowY: "hidden",
    //         }}
    //       >
    //         <ResponsiveContainer width={dynamicChartWidth} height={400}>
    //           <BarChart
    //             data={aggregatedData}
    //             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    //           >
    //             <CartesianGrid stroke="#444" strokeDasharray="3 3" />
    //             <XAxis dataKey="monthLabel" stroke="#fff" />
    //             <YAxis
    //               unit="₫"
    //               stroke="#fff"
    //               // tickFormatter={(value) => `${(value / 1000000).toFixed(0)}tr`}
    //               tickFormatter={(value) => `${value.toLocaleString("vi-VN")} `}
    //             />
    //             <Tooltip
    //               contentStyle={{ backgroundColor: "#333", border: "none" }}
    //               labelStyle={{ color: "#fff" }}
    //               itemStyle={{ color: "#fff" }}
    //               // Định dạng giá trị tooltip để hiển thị tiền tệ
    //               formatter={(value) => `${value.toLocaleString("vi-VN")} ₫`}
    //             />
    //             <Bar
    //               dataKey="revenue" // dataKey bây giờ là "revenue"
    //               fill="#8884d8" // Màu của cột
    //               // Bạn có thể thêm animation nếu muốn
    //               // animationDuration={300}
    //             />
    //           </BarChart>
    //         </ResponsiveContainer>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <>
      <div className="chart">
        <div
        // className="editScroll"
        // ref={scrollContainerRef}
        // style={{
        //   height:
        //     "calc(100% + 17px)" /* 17px là chiều cao điển hình của thanh cuộn trên Windows */,
        //   overflowX: "auto",
        //   overflowY: "hidden",
        // }}
        >
          <ResponsiveContainer width={dynamicChartWidth} height={400}>
            <BarChart
              data={filteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid stroke="#444" strokeDasharray="3 3" />
              <XAxis dataKey="monthLabel" stroke="#fff" />
              <YAxis
                unit="₫"
                stroke="#fff"
                // tickFormatter={(value) => `${(value / 1000000).toFixed(0)}tr`}
                tickFormatter={(value) => `${value.toLocaleString("vi-VN")} `}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#333", border: "none" }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
                // Định dạng giá trị tooltip để hiển thị tiền tệ
                formatter={(value) => `${value.toLocaleString("vi-VN")} ₫`}
              />
              <Bar
                dataKey="revenue" // dataKey bây giờ là "revenue"
                fill="#fab31f" // Màu của cột
                // Bạn có thể thêm animation nếu muốn
                // animationDuration={300}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default SalesChart;
