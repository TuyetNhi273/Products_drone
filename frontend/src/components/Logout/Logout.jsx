import React from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "./Logout.css"; // Đảm bảo import CSS đã tạo
import { clearStorage } from "../../redux/store";
import { useDispatch } from "react-redux";
import { RFsellerSuccess } from "../../redux/authSlice";
/**
 * Xử lý logout
 * @param {boolean} isGoogleUser - có phải là người dùng Google hay không?
 */
function Logout({ isGoogleUser = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /**
   * Xử lý logout thường
   */
  const handleLogoutClick = () => {
    clearStorage();
    dispatch(RFsellerSuccess(null));
    navigate("/login"); // Điều hướng đến trang đăng nhập
  };

  /**
   * Xử lý logout Google
   */
  const handleGoogleLogout = () => {
    clearStorage();
    googleLogout();
    dispatch(RFsellerSuccess(null));

    navigate("/login"); // Điều hướng đến trang đăng nhập
  };

  return (
    <div className="logout-container">
      {isGoogleUser ? (
        <button onClick={handleGoogleLogout}>Logout</button>
      ) : (
        <input type="button" onClick={handleLogoutClick} value="Log out" />
      )}
    </div>
  );
}

export default Logout;


