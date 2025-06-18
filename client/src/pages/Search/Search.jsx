import React, { useContext, useEffect, useState } from "react";
import AllProducts from "../AllProducts/AllProducts";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q") || "";

  const [inputValue, setInputValue] = useState(() => q); // chỉ set 1 lần từ URL
  const [searchTerm, setSearchTerm] = useState(q); // dùng để lọc

  // Khi searchTerm thay đổi => cập nhật URL
  useEffect(() => {
    const encoded = encodeURIComponent(searchTerm.trim());
    navigate(`/search?q=${encoded}`, { replace: true });
  }, [searchTerm]);
  return (
    <>
      <AllProducts
        isSearch={true}
        searchTerm={searchTerm}
        setInputValue={setInputValue}
        inputValue={inputValue}
        onSearch={() => setSearchTerm(inputValue)}
      />
    </>
  );
};

export default Search;
