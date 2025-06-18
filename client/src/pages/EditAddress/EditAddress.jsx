import React, { useContext, useState } from "react";
import "./EditAddress.scss";
import { UserContext } from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import { updateAddressService } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const EditAddress = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext); // Lấy user từ context
  console.log("🚀 ~ EditAddress ~ user:", user);

  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    country: "Việt Nam",
  });
  const [errors, setErrors] = useState({
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData?.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ.";
    if (!formData?.city.trim()) newErrors.city = "Vui lòng nhập thành phố.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    let address =
      formData?.address +
      ", thành phố " +
      formData?.city +
      ", " +
      formData?.country;
    let userId = user.id;
    try {
      let res = await updateAddressService({ userId, address });

      if (res.data.code === 200) {
        setUser((prev) => ({
          ...prev,
          address: res.data.data,
        }));
        navigate("/account"); // Chuyển đến trang "/dashboard"
        console.log("🚀 ~ handleSubmit ~ res:", res);
      }
    } catch (e) {
      console.log("🚀 ~ handleSubmit ~ e:", e);
    }
  };

  return (
    <div className="editAddressContainer">
      <NavLink style={{ color: "white" }} to="/account" className="back-link">
        Quay lại chi tiết tài khoản
      </NavLink>
      <h2 className="title">
        Địa chỉ của bạn : {user?.address ? user?.address : "Hong có"}
      </h2>
      <div className="address-card">
        <p className="default">(Mặc định)</p>
        <p className="name">{user?.username}</p>
        <p className="country">Việt Nam</p>
        <div className="actions">
          {!edit && (
            <>
              <a className="edit" onClick={() => setEdit(true)}>
                Sửa
              </a>
              {/* <span className="divider">|</span> */}
              {/* <a className="delete">Xóa</a> */}
            </>
          )}
        </div>
      </div>
      {edit && (
        <>
          <div className="form-container">
            <form className="address-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nhập địa chỉ"
                value={formData?.address}
                onChange={handleChange}
                name="address"
              />
              {errors?.address && <p className="error">{errors?.address}</p>}

              <input
                type="text"
                name="city"
                placeholder="Nhập thành phố"
                value={formData?.city}
                onChange={handleChange}
              />
              {errors?.city && <p className="error">{errors?.city}</p>}

              <select
                name="country"
                value={formData?.country}
                onChange={handleChange}
              >
                <option>Việt Nam</option>
                <option>Hoa Kỳ</option>
                <option>Nhật Bản</option>
              </select>

              <button type="submit" className="submit-btn">
                Thêm địa chỉ
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setEdit(false)}
              >
                Hủy
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default EditAddress;
