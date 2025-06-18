import React, { useContext, useState } from "react";
import AllProducts from "../../AllProducts/AllProducts";

const SilverRing = () => {
  const categoryId = 10;
  const bannerData = {
    title: "NHẪN BẠC NAM - KHẲNG ĐỊNH SỰ KHÁC BIỆT",
    description:
      "Khám phá bộ sưu tập nhẫn bạc nam đẹp, chất liệu bạc cao cấp, đa dạng kiểu dáng. Thiết kế độc nhất, tinh tế nâng tầm phong cách đàn ông trưởng thành.",
    image: "nhan-bac.gif", // Đổi đường dẫn ảnh phù hợp
  };
  return (
    <>
      <AllProducts categoryId={categoryId} banner={bannerData} />
    </>
  );
};

export default SilverRing;
