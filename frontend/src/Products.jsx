import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaBell, FaClipboardList } from "react-icons/fa";
import { useSelector } from "react-redux";
import avt from "../src/assets/image/avt.png";
import "./Products.css";
import Header from "./components/Products/Header";

function Products({ children }) {
  const tts_user = useSelector((state) => state.auth.login.currentUser);
  const [user, setUser] = useState({
    name: tts_user?.payload?.name || "Ẩn Danh",
    avatar: tts_user?.payload?.avatar || avt,
  });
  const [isPurchaseOrderOpen, setIsPurchaseOrderOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (tts_user !== null) {
      setUser({
        name: tts_user?.payload?.name || "Ẩn Danh",
        avatar: tts_user?.payload?.avatar || avt,
      });
    }
  }, [tts_user]);

  useEffect(() => {
    if (!location.pathname.startsWith("/products/purchase-order")) {
      setIsPurchaseOrderOpen(false);
    }
  }, [location]);

  return (
    <div className="products-layout">
      <header>
        <Header />
      </header>

      <aside className="sidebar">
        <br />
        <div style={{ borderBottom: "1px solid #E6E6FA", marginTop: "-2rem" }}>
          <div className="user-info">
            <img src={user.avatar} alt="Avatar" className="user-avatar" />
            <div>
              <p className="user-name">{user.name}</p>

              <Link to="/products/seller" className="user-sell">
                Regist for seller
              </Link>
            </div>
          </div>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/products/home">
                <FaHome /> HomePage
              </Link>
            </li>
            <li>
              <Link to="/products/my-account">
                <FaUser /> My Account
              </Link>
            </li>
            <li>
              <Link to="/products/notifications">
                <FaBell /> Notifications
              </Link>
            </li>
            <li>
              <div
                onClick={() =>
                  setIsPurchaseOrderOpen((prevState) => !prevState)
                }
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaClipboardList />
                <span style={{ marginLeft: "10px" }}>Purchase Order</span>
              </div>
              {isPurchaseOrderOpen && (
                <ul className="sub-menu">
                  <li>
                    <Link to="/products/purchase-order/cart">Cart</Link>
                  </li>
                  <li>
                    <Link to="/products/purchase-order/payment">Payment</Link>
                  </li>
                  <li>
                    <Link to="/products/purchase-order/tracking">
                      Order Tracking
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}

export default Products;
