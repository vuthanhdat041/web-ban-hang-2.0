import React from "react";
import "./styles_gift.scss";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { NavLink } from "react-router-dom";

function Gift() {
  return (
    <div className="container">
      <div className="noiDung">
        <div className="anh1">
          {/* <p>Ảnh 1</p> */}
          <div className="video-container">
            <video autoPlay loop muted>
              <source
                src="https://cdn.shopify.com/videos/c/o/v/5bbc5b6c0beb4184b3dc753eef2bd199.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        <div className="text">
          <h1>HỮU HÌNH HOÁ NIỀM VUI</h1>
          <p>
            Khám phá những cách để ‘hữu hình hoá’ cảm xúc của bạn cho người ấy
            qua từng chế tác thủ công từ bàn tay người Việt.
          </p>
        </div>
      </div>

      {/*  */}
      <div className="tren">
        <h2>BẠN CẦN QUÀ TẶNG CHO…</h2>
      </div>

      <div className="duoi">
        <div className="box">
          {" "}
          <img src="/img/Gift/he.jpg" />
          <div className="text">ANH ẤY</div>
        </div>

        <div className="box">
          {" "}
          <img src="/img/Gift/she.jpg" />
          <div className="text">CÔ ẤY</div>
        </div>
      </div>

      <div className="tren">
        <h2>QUÀ TẶNG ĐA TẦNG Ý NGHĨA</h2>
      </div>
      <div className="duoi">
        <div className="box">
          <img src="/img/Gift/couple.jpg" />
          <div className="text">Nhẫn đôi cho cặp tình nhân</div>
        </div>

        <div className="box">
          <img src="/img/Gift/story.jpg" />
          <div className="text">Những chế tác mang câu chuyện đằng sau</div>
        </div>
      </div>

      {/* <div className="image">
        <div className="text-container">
          <div className="overlay-text">Chữ đè lên ảnh </div>
        </div>
      </div> */}

      <div className="tren">
        <h2>GHÉ THĂM HELIOS</h2>
      </div>
      <div className="duoi">
        <div className="box">
          <NavLink
            style={{ textDecoration: "none", color: "white" }}
            to="/contact"
          >
            <img src="/img/Gift/offline-shopping.jpg" />
          </NavLink>
          <div className="text">Mua tại cửa hàng</div>
        </div>

        <div className="box">
          <NavLink
            style={{ textDecoration: "none", color: "white" }}
            to="/allproduct"
          >
            <img src="/img/Gift/online-shopping.jpg" />
          </NavLink>
          <div className="text">Mua sắm trực tuyến</div>
        </div>
      </div>
    </div>
  );
}
export default Gift;
