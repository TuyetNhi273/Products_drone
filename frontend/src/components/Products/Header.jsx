import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Header.css";
import logo from "../../assets/image/logo.png";
import cartIcon from "../../assets/image/cart-icon.png";
import searchIcon from "../../assets/image/search-icon.png";
import Logout from "../Logout/Logout";

function Header() {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  // Hàm xử lý khi nhấp vào icon Cart
  const handleCartClick = () => {
    navigate("/products/purchase-order/cart"); // Điều hướng đến trang Cart
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="header-logo">
        <img src={logo} alt="Products" />
        <span>Products</span>
      </div>

      {/* Search bar */}
      <div className="header-search">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm sản phẩm, thương hiệu, và tên shop"
        />
        <button className="search-button">
          <img src={searchIcon} alt="Search" />
        </button>
      </div>

      {/* Cart icon */}
      <div className="header-cart" onClick={handleCartClick}>
        <img src={cartIcon} alt="Cart" style={{ cursor: "pointer" }} />
      </div>

      {/* Logout button */}
      <Logout />
    </header>
  );
}

export default Header;
