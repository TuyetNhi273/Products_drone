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
    if (location.pathname.startsWith("/products/purchase-order")) {
      setIsPurchaseOrderOpen(true);
    }else {
      setIsPurchaseOrderOpen(false);
    }
  }, [location]);

  return (
    <div className="products-layout">
      <aside className="sidebar">
        <br />
        <div className="user-profile" >
          <div className="user-info">
            <img src={user.avatar} alt="Avatar" className="user-avatar" />
            <div>
              <p className="user-name">{user.name}</p>
              <Link to="/products/purchase-order/seller/RFseller" className="user-sell">
                Regist for seller
              </Link>
            </div>
          </div>
        </div>

        <nav>
          <ul>
            <li className="st">
              <Link to="/products/home">
                <FaHome /> HomePage
              </Link>
            </li>
            <li className="st">
              <Link to="/products/my-account">
                <FaUser /> My Account
              </Link>
            </li>
            <li className="st">
              <Link to="/products/notifications">
                <FaBell /> Notifications
              </Link>
            </li>
            <li className="st">
              <div
                onClick={() =>
                  setIsPurchaseOrderOpen((prevState) => !prevState)
                }
              >
                <FaClipboardList />
                <span className="po">Purchase Order</span>
              </div>
              {isPurchaseOrderOpen && (
                <ul className="sub-menu">
                  <li className="mini">
                    <Link to="/products/purchase-order/cart">Cart</Link>
                  </li>
                  <li className="mini">
                    <Link to="/products/purchase-order/payment">Payment</Link>
                  </li>
                  <li className="mini">
                    <Link to="/products/purchase-order/tracking">
                      Order Tracking
                    </Link>
                  </li>
                  <li className="mini">
                    <Link to="/products/purchase-order/seller/RFseller">
                      Seller
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      <main className="content" style={{ position: "relative" }}>
        <Header />
        {children}
        
      </main>
    </div>
  );
}

export default Products;
