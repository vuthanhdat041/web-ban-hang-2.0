import React, { useContext, useEffect, useState } from "react";
import "./Accessories.scss";

import AllProducts from "../AllProducts/AllProducts";

const Accessories = () => {
  const categoryId = 14;
  const bannerData = {
    title: "ACCESSORIES",
    description: "",
    image: "accessories.jpg", // Đổi đường dẫn ảnh phù hợp
  };
  return (
    <>
      <AllProducts categoryId={categoryId} banner={bannerData} />
    </>
  );
};

export default Accessories;
