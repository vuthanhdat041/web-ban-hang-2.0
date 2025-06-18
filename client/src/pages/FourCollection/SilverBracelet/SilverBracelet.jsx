import React, { useContext, useState } from "react";
import AllProducts from "../../AllProducts/AllProducts";

const SilverBracelet = () => {
  const categoryId = 11;

  const bannerData = {
    title: "VÒNG TAY BẠC NAM - KHÁC BIỆT VỚI SỐ ĐÔNG",
    description:
      "Bộ sưu tập vòng tay bạc nam đa dạng mẫu mã, từ vòng cứng mạnh mẽ, vòng Cuban cá tính đến vòng trầm cổ điển. Tất cả đều được chế tác thủ công từ bạc S925.",
    image: "vong-tay-bac.gif", // Đổi đường dẫn ảnh phù hợp
  };
  return (
    <>
      <AllProducts categoryId={categoryId} banner={bannerData} />
    </>
  );
};

export default SilverBracelet;
