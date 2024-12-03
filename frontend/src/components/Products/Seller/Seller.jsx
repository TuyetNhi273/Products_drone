import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import avt from "../../../assets/image/avt.png";
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay vì useHistory
import Items from "./Items";
import "./Seller.css";

const Seller = ({children}) => {
  const tts_user = useSelector((state) => state.auth.login.currentUser);
  const tts_seller = useSelector((state) => state.auth.RFseller.success);
  
  const [user, setUser] = useState({
    shopName: tts_seller?.payload?.shopName || "Ẩn Danh",
    avatar: tts_user?.payload?.avatar || avt,
  });

  // Sử dụng useNavigate thay vì useHistory
  const navigate = useNavigate(); // Khai báo hook navigate

  useEffect(() => {
    if (tts_user !== null && tts_seller !== null) {
      setUser({
        shopName: tts_seller?.payload?.shopName || "Ẩn Danh",
        avatar: tts_user?.payload?.avatar || avt,
      });
    }
    console.log(tts_seller?.payload?.shopName)
  }, [tts_user , tts_seller]);

  // Hàm mở trang thêm món mới
  const handleNewItemClick = () => {
    // Sử dụng navigate để điều hướng đến trang thêm món
    navigate("/products/purchase-order/seller/add-item"); // Đây là đường dẫn giả định của trang thêm món
  };

  return (
    <div className="seller-container">
      <div className="seller-info">
        <div className="image-container">
          <img 
            src={user.avatar} 
            alt="Seller" 
            className="seller-image" />
        </div>
        <p className="seller-name">{user.shopName}</p>
      </div>
      
      {/* Nút New Item */}
      <div className="button" onClick={handleNewItemClick}>
        New Item
      </div>

      <div><Items/></div>
    </div>
  );
};

export default Seller;
