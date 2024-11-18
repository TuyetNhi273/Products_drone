import React from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "./Logout.css"; // Đảm bảo import CSS đã tạo

function Logout({ isGoogleUser = false }) {
  const navigate = useNavigate();

  // Xử lý logout thường
  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    localStorage.clear();
    navigate("/login"); // Điều hướng đến trang đăng nhập
  };

  // Xử lý logout Google
  const handleGoogleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    localStorage.clear();
    alert("Đăng xuất Google thành công");
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
