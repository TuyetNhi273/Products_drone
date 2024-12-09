import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Header.css";
import logo from "../../assets/image/logo.png";
import cartIcon from "../../assets/image/cart-icon.png";
import searchIcon from "../../assets/image/search-icon.png";
import Logout from "../Logout/Logout";
import { useSelector } from "react-redux";
function Header() {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const userItemCart = useSelector((state) => state.auth.ItemCart.success?.cartCount);
  const ss = useSelector((state) => state.auth.ItemCart.success);
  // Hàm xử lý khi nhấp vào icon Cart
  const handleCartClick = () => {
    navigate("/products/purchase-order/cart"); // Điều hướng đến trang Cart
  };
  console.log(ss);
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
          placeholder="Search for products, brands, and shop names."
        />
        <button className="search-button">
          <img src={searchIcon} alt="Search" />
        </button>
      </div>

      {/* Cart icon */}
      <div className="header-cart" onClick={handleCartClick} style={{position: "relative"}}>
        <img src={cartIcon} alt="Cart" style={{ cursor: "pointer" }} />
        <span className="cart-count" style={{ cursor: "pointer", position: "absolute", top: "0", right: "10px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "transparent", color: "#5eadeb", display: "flex", justifyContent: "center", alignItems: "center"}}>{userItemCart}</span>
      </div>

      {/* Logout button */}
      <Logout />
    </header>
  );
}

export default Header;