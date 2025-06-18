import { useEffect, useState } from "react";
import "./SearchModal.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const SearchModal = ({ isOpen, closeModal }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      setQuery(""); // reset input khi mở modal
    }
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="searchModalComponent">
      <div className="overlay" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            placeholder="Gõ để tìm kiếm"
            className="search-input"
            onChange={(e) => setQuery(e.target.value)}
            // autoComplete="off"
            name=""
          />
          <NavLink
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
          </NavLink>

          <div
            className="close"
            style={{ cursor: "pointer" }}
            onClick={closeModal}
          >
            <RxCross2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
