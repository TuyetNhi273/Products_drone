import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import avt from "../../../assets/image/avt.png";

import "./Seller.css";

const Seller = ({children}) => {
  const tts_user = useSelector((state) => state.auth.login.currentUser);
  const tts_seller = useSelector((state) => state.auth.RFseller.success);
  
  const [user, setUser] = useState({
    shopName: tts_seller?.payload?.shopName || "Ẩn Danh",
    avatar: tts_user?.payload?.avatar || avt,
  });

  useEffect(() => {
    if (tts_user !== null  && tts_seller !== null) {
      setUser({
        shopName: tts_seller?.payload?.shopName || "Ẩn Danh",
        avatar: tts_user?.payload?.avatar || avt,
      });
    }
    console.log(tts_seller?.payload?.shopName)
  }, [tts_user , tts_seller]);

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
      <div class="button">New Item</div>
      <div>items</div>
    </div>
  );
};

export default Seller;
