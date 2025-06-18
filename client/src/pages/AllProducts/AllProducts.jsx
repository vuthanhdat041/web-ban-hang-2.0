import React, { useState, useEffect, useContext } from "react";
import "./AllProducts.scss";
import PriceRange from "../Accessories/PriceRange";
import QuickAddModal from "../../components/QuickAddModal/QuickAddModal";
import { UserContext } from "../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { ProductContext } from "../../context/ProductContext";
import { ClipLoader } from "react-spinners";
import removeAccents from "remove-accents";

import { FaArrowRightLong } from "react-icons/fa6";
const AllProducts = ({
  categoryId,
  banner,
  isSearch,
  searchTerm,
  setInputValue,
  onSearch,
  inputValue,
}) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCartContext, fetchCartContext } = useContext(CartContext);
  const handleScroll = () => {
    if (window.scrollY > 476.79998779296875) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const [expanded, setExpanded] = useState({});
  const { loading, productsByCondition, allProductWithoutAccessoriesContext } =
    useContext(ProductContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [range, setRange] = useState([0, 10000000]);
  const [condition, setCondition] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productChoosen, setProductChoosen] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState({
    alphabetAZ: false,
    alphabetZA: false,
    priceAsc: false,
    priceDesc: false,
    dateOld: false,
    dateNew: false,
  });
  // const [searchTerm, setSearchTerm] = useState("");

  const handlePriceChange = (range) => {
    setRange(range); // Lưu giá trị mới từ slider
  };
  const handleCheckboxChange = (key) => (e) => {
    const isChecked = e.target.checked;
    setCheckedOptions((prev) =>
      isChecked
        ? Object.fromEntries(Object.keys(prev).map((k) => [k, k === key]))
        : Object.fromEntries(Object.keys(prev).map((k) => [k, false]))
    );
  };
  const toggleExpand = (category) => {
    setExpanded((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleAddToCart = (product) => {
    setShowModal(true);
    setProductChoosen(product);
  };
  const handleQuickAdd = async (data) => {
    if (!user.user) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }
    const quickAddData = {
      user_id: user?.user?.id,
      product_id: data.product.id,
      quantity: data.quantity,
      price: data.product.price,
    };
    let res = await addToCartContext(quickAddData);
    return res;
  };

  useEffect(() => {
    const newCondition = {
      ...checkedOptions,
      priceRange: {
        min: range[0],
        max: range[1],
      },
      categoryId: categoryId,
    };
    setCondition(newCondition);
  }, [checkedOptions, range]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      allProductWithoutAccessoriesContext(condition);
    }, 300);
    return () => clearTimeout(timeout);
  }, [condition]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const bannerData = banner || {
    title: "ALL PRODUCT",
    description: "",
    image: "all-products.jpg",
  };

  const filtered =
    searchTerm && searchTerm.trim().toLowerCase()
      ? productsByCondition.filter((product) => {
          const normalizedSearchTerm = removeAccents(
            searchTerm.trim().toLowerCase()
          );
          const normalizedProductName = removeAccents(
            product.name.toLowerCase()
          );

          return normalizedProductName.includes(normalizedSearchTerm);
        })
      : productsByCondition;
  const productsToDisplay = isSearch ? filtered : productsByCondition;
  // console.log("🚀 ~ AllProducts ~ productsToDisplay:", productsToDisplay);

  const viewProduct = (product) => {
    navigate(`/product/${product.name}`, { state: { product } });
  };

  return (
    <div className="allProductsContainer">
      {isSearch ? (
        <div className="banner">
          <div
            style={{
              fontSize: "30px",
            }}
          >
            Tìm Kiếm
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Gõ để tìm kiếm"
              className="search-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              // onChange={(e) => setQuery(e.target.value)}

              name=""
            />
            {/* <NavLink
            style={{
              textDecoration: "none",
              fontSize: "30px",
              // cursor: "pointer",
              color: "white",
              cursor: query.trim() ? "pointer" : "not-allowed",
            }}
            exact
            onClick={(e) => {
              if (!query.trim()) {
                e.preventDefault(); // Chặn chuyển trang nếu trống
              } else {
                closeModal();
              }
            }}
            to={`/search?q=${encodeURIComponent(query)}`}
            // to={`/homeAdmin/productMacustomerManagernager/detail/${customer.id}`}
          >
            <FaArrowRightLong />
          </NavLink> */}
            <div
              onClick={onSearch}
              style={{
                cursor: inputValue.trim() ? "pointer" : "not-allowed",
                color: "white",
                marginLeft: "10px",
                fontSize: "24px",
              }}
            >
              <FaArrowRightLong />
            </div>
          </div>
        </div>
      ) : (
        <div className={banner ? "banner" : "banner bigger"}>
          <div className="banner-image">
            <img src={`/img/${bannerData?.image}`} alt="Banner" />
          </div>
          <div className="banner-content">
            <div className="banner-title">{bannerData?.title}</div>
            <div className="banner-description">{bannerData?.description}</div>
          </div>
        </div>
      )}
      <div className="product-gallery-container">
        <div className={`category-list ${isScrolled ? "scrolled" : ""}`}>
          <PriceRange onChange={handlePriceChange} />
          <hr style={{ width: "100%" }} />
          <div
            className="categoryChoice"
            onClick={() => toggleExpand("sortBy")}
          >
            <div className="text">Lọc bằng</div>

            <span style={{ cursor: "pointer" }}>
              {expanded["sortBy"] ? "-" : "+"}
            </span>
          </div>
          {expanded["sortBy"] ? (
            <div className="checkboxChoice">
              <div className="checkboxChoiceContent">
                <input
                  type="checkbox"
                  checked={checkedOptions.alphabetAZ}
                  className="custom-checkbox"
                  onChange={handleCheckboxChange("alphabetAZ")}
                />
                <div className="text">Thứ tự bảng chữ cái (từ A-Z)</div>
              </div>
              <div className="checkboxChoiceContent">
                <input
                  type="checkbox"
                  checked={checkedOptions.alphabetZA}
                  className="custom-checkbox"
                  onChange={handleCheckboxChange("alphabetZA")}
                />
                <div className="text">Thứ tự bảng chữ cái (từ Z-A)</div>
              </div>
              <div className="checkboxChoiceContent">
                <input
                  type="checkbox"
                  checked={checkedOptions.priceAsc}
                  className="custom-checkbox"
                  onChange={handleCheckboxChange("priceAsc")}
                />
                <div className="text">Giá (từ thấp đến cao)</div>
              </div>
              <div className="checkboxChoiceContent">
                <input
                  type="checkbox"
                  checked={checkedOptions.priceDesc}
                  className="custom-checkbox"
                  onChange={handleCheckboxChange("priceDesc")}
                />
                <div className="text">Giá (từ cao xuống thấp)</div>
              </div>
              <div className="checkboxChoiceContent">
                <input
                  type="checkbox"
                  checked={checkedOptions.dateOld}
                  className="custom-checkbox"
                  onChange={handleCheckboxChange("dateOld")}
                />
                <div className="text">Ngày (từ cũ đến mới)</div>
              </div>
              <div className="checkboxChoiceContent">
                <input
                  type="checkbox"
                  checked={checkedOptions.dateNew}
                  className="custom-checkbox"
                  onChange={handleCheckboxChange("dateNew")}
                />
                <div className="text">Ngày (từ mới đến cũ)</div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {loading ? (
          <div
            className="product-gallery"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ClipLoader size={60} color={"#fab320"} loading={loading} />
          </div>
        ) : productsToDisplay && productsToDisplay.length > 0 ? (
          <div className={`product-gallery ${isScrolled ? "scrolled" : ""}`}>
            {[...productsToDisplay]
              .sort((a, b) => {
                if (a.status === "Active" && b.status === "Inactive") return -1;
                if (a.status === "Inactive" && b.status === "Active") return 1;
                return 0;
              })
              .map((product, index) => (
                <div
                  key={index}
                  className={`product-card ${
                    product.status !== "Active" ? "sold-out" : ""
                  }`}
                >
                  <div className="product-image">
                    <img
                      onClick={() => {
                        viewProduct(product);
                      }}
                      className="img"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="product-details">
                    <h2>{product.name}</h2>
                    <p>{product.price.toLocaleString("vi-VN")} VND</p>
                    {product.status !== "Active" ? (
                      <button className="sold-out-btn">HẾT HÀNG</button>
                    ) : (
                      <button onClick={() => handleAddToCart(product)}>
                        Thêm nhanh
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="product-gallery" style={{ color: "white" }}>
            Không có kết quả tìm kiếm
          </div>
        )}
      </div>
      <QuickAddModal
        onConfirm={handleQuickAdd}
        show={showModal}
        onClose={() => setShowModal(false)}
        product={productChoosen}
      />
    </div>
  );
};

export default AllProducts;
