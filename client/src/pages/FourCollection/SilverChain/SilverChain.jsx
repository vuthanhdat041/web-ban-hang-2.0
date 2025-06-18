import React, { useContext, useState } from "react";
import AllProducts from "../../AllProducts/AllProducts";

const SilverChain = () => {
  const categoryId = 12;

  const bannerData = {
    title: " DÂY CHUYỀN BẠC NAM - THIẾT KẾ ĐỘC BẢN",
    description:
      "Bộ sưu tập dây chuyền bạc nam độc nhất với đa dạng kích thước, hình dáng để phù hợp với nhiều phong cách, từ cá tính đến trưởng thành.",
    image: "day-chuyen-bac.gif", // Đổi đường dẫn ảnh phù hợp
  };
  return (
    <>
      <AllProducts categoryId={categoryId} banner={bannerData} />
    </>
  );
};

export default SilverChain;
