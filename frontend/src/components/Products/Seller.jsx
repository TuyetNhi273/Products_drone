import React, { useState } from "react";
import "./Seller.css";

function Seller() {
  const [shopName, setShopName] = useState("");
  const [pickupAddresses, setPickupAddresses] = useState([]);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleAddPickupAddress = () => {
    const newAddress = prompt("Enter pickup address:");
    if (newAddress) {
      setPickupAddresses([...pickupAddresses, newAddress]);
    }
  };

  const handleSave = () => {
    console.log("Saved Data:", {
      shopName,
      pickupAddresses,
      email,
      phoneNumber,
    });
  };

  const handleNext = () => {
    console.log("Proceeding to next step...");
    alert("Moving to the next step!");
  };

  return (
    <div className="seller-container">
      <div className="progress-bar">
        <div className="progress-step active">Thông tin Shop</div>
        <div className="progress-step">Cài đặt vận chuyển</div>
        <div className="progress-step">Thông tin thuế</div>
        <div className="progress-step">Thông tin định danh</div>
        <div className="progress-step">Hoàn tất</div>
      </div>

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="shop-name">* Tên Shop</label>
          <input
            type="text"
            id="shop-name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            maxLength={30}
            placeholder="Tên Shop"
          />
          <span className="character-count">{shopName.length}/30</span>
        </div>

        <div className="form-group">
          <label>* Địa chỉ lấy hàng</label>
          <button className="add-address-btn" onClick={handleAddPickupAddress}>
            + Thêm
          </button>
          {pickupAddresses.length === 0 && (
            <p className="error-message">
              Vui lòng thiết lập địa chỉ lấy hàng của bạn
            </p>
          )}
          <ul className="address-list">
            {pickupAddresses.map((address, index) => (
              <li key={index}>{address}</li>
            ))}
          </ul>
        </div>

        <div className="form-group">
          <label htmlFor="email">* Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập vào"
          />
          {!email && (
            <p className="error-message">Vui lòng nhập địa chỉ email</p>
          )}
        </div>

        <div className="form-group">
          <label>* Số điện thoại</label>
          <input
            type="text"
            id="phone-number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            maxLength={30}
            placeholder="Nhập số điện thoại"
          />
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button className="save-btn" onClick={handleSave}>
            Lưu
          </button>
          <button className="next-btn" onClick={handleNext}>
            Tiếp theo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Seller;
