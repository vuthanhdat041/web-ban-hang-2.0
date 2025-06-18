import React, { useState, useEffect, useContext } from "react";
import "./MainContent.scss";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { getNewestProduct } from "../../services/productService";
import { ProductContext } from "../../context/ProductContext";
import ReactPlayer from "react-player";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import QuickAddModal from "../QuickAddModal/QuickAddModal";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";

const MainContent = () => {
  // const [products, setProducts] = useState([]);
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [productChoosen, setProductChoosen] = useState([]);

  const { addToCartContext, fetchCartContext } = useContext(CartContext);
  const handleAddToCart = (product) => {
    setShowModal(true);
    setProductChoosen(product);
  };
  const { newestProducts, getNewestProductContext } =
    useContext(ProductContext);
  // console.log("🚀 ~ MainContent ~ newestProducts:", newestProducts);

  const items = newestProducts.map((product) => (
    <div className="item" data-value={product.id} key={product.id}>
      <div className="product-item">
        <div className="itemImage">
          <img className="img" src={product.image} alt={product.name} />
        </div>
        <div className="itemInformation">
          <div className="information">{product.name}</div>
          <div className="information">
            {product.price.toLocaleString()} VND
          </div>
        </div>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => handleAddToCart(product)}
          className="chooseSize"
        >
          Thêm nhanh
        </button>
      </div>
    </div>
  ));
  const responsive = {
    0: { items: 1 }, // Hiển thị 1 slide trên màn hình nhỏ
    768: { items: 2 }, // Hiển thị 2 slide trên màn hình trung bình
    1024: { items: 4 }, // Hiển thị 4 slide trên màn hình lớn
  };
  // const handleGetNewestProduct = async () => {
  //   try {
  //     const res = await getNewestProduct();
  //     if (res.data.code === 201) {
  //       setProducts(res.data.data);
  //     }
  //   } catch (error) {
  //     console.log("🚀 ~ handleGetNewestProduct ~ error:", error);
  //   }
  // };

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
    // handleGetNewestProduct();
    getNewestProductContext();
  }, []);
  return (
    <div className="mainContentContainer">
      {/* <div className="heroImage"> */}
      <img src="/img/banner.webp" alt="Avatar" className="heroImage" />
      {/* </div> */}
      <div className="productLauch">
        <div className="title">Sản Phẩm Mới Ra Mắt!</div>
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          touchTracking
          infinite={false}
          disableButtonsControls={false}
          disableDotsControls={true}
          renderPrevButton={() => (
            <button className="custom-prev-button">{"<"}</button>
          )}
          renderNextButton={() => (
            <button className="custom-next-button">{">"}</button>
          )}
        />
      </div>
      <div className="image-preview">
        <div className="left">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=mcSF6Yj4Auc"
            playing
            // loop
            controls={false}
            muted
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  showinfo: 0,
                  rel: 0,
                  controls: 0,
                  fs: 0,
                  disablekb: 1,
                },
              },
            }}
          />
        </div>

        <div className="right">
          <h1>8 NĂM HÀNH TRÌNH CHẾ TÁC THỦ CÔNG BẠC</h1>
          <h4>
            Mỗi món trang sức của Helios đều được chế tác thủ công bởi người thợ
            kim hoàn lành nghề, mang trọn tâm huyết và niềm đam mê trong từng
            nét chạm khắc tỉ mỉ.
          </h4>
        </div>
      </div>
      <div className="gallery-image">
        <div className="title">Danh Mục Sản Phẩm</div>
        <div className="product">
          <NavLink
            style={{ textDecoration: "none", color: "white" }}
            to="/collections/nhan-bac"
            className="ring box"
          >
            <div className="img">
              <img src="/img/MainContent/nhan-bac.jpg" alt="description" />
            </div>
            <div className="text">NHẪN BẠC NAM - KHẲNG ĐỊNH SỰ KHÁC BIỆT</div>
          </NavLink>
          <NavLink
            style={{ textDecoration: "none", color: "white" }}
            to="/collections/day-chuyen-bac"
            className="necklace box"
          >
            <div className="img">
              <img
                src="/img/MainContent/day-chuyen-bac.jpg"
                alt="description"
              />
            </div>
            <div className="text">DÂY CHUYỀN BẠC NAM - THIẾT KẾ ĐỘC BẢN</div>
          </NavLink>
          <NavLink
            style={{ textDecoration: "none", color: "white" }}
            to="/collections/khuyen-tai-bac"
            className="earrings box"
          >
            <div className="img">
              <img
                src="/img/MainContent/khuyen-tai-bac.jpg"
                alt="description"
              />
            </div>
            <div className="text">
              KHUYÊN TAI BẠC NAM - ĐỊNH HÌNH SỰ KHÁC BIỆT
            </div>
          </NavLink>
          <NavLink
            style={{ textDecoration: "none", color: "white" }}
            to="/collections/vong-tay-bac"
            className="bracelet box"
          >
            <div className="img">
              <img src="/img/MainContent/vong-tay-bac.jpg" />
            </div>
            <div className="text">VÒNG TAY BẠC NAM - KHÁC BIỆT VỚI SỐ ĐÔNG</div>
          </NavLink>
        </div>
      </div>
      <NavLink
        style={{ textDecoration: "none", color: "white" }}
        to="/allproduct"
        className="banner"
      >
        <img src="/img/MainContent/banner.jpg" className="banner-img" />
      </NavLink>
      <div></div>
      <QuickAddModal
        onConfirm={handleQuickAdd}
        show={showModal}
        onClose={() => setShowModal(false)}
        product={productChoosen}
      />
    </div>
  );
};

export default MainContent;
