import React, { useContext, useState } from "react";
import AllProducts from "../../AllProducts/AllProducts";

const SilverEarring = () => {
  const categoryId = 13;

  const bannerData = {
    title: " KHUYÊN TAI BẠC NAM - ĐỊNH HÌNH SỰ KHÁC BIỆT",
    description:
      "Khẳng định màu sắc cá nhân với khuyên tai bạc nam. Các chế tác được thiết kế với nhiều kiểu dáng, phù hợp với phong cách và đặc trưng khuôn mặt khác nhau.",
    image: "khuyen-tai-bac.gif", // Đổi đường dẫn ảnh phù hợp
  };
  return (
    <>
      <AllProducts categoryId={categoryId} banner={bannerData} />
    </>
  );
};

export default SilverEarring;
