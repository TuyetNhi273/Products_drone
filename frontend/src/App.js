import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Register/Register";
import PageLogin from "./components/Login/PageLogin";
import MyAccount from "./components/Products/MyAccount/MyAccount";
import Products from "./Products";
import Home from "./Home";
import HomePage from "./components/Products/HomePage/HomePage";
import Notifications from "./components/Products/Notifications/Notifications";

import Cart from "./components/Products/Purchase/Cart";
import Payment from "./components/Products/Purchase/Payment";
import Tracking from "./components/Products/Purchase/Tracking";

import RFSeller from "./components/Products/RFSeller/RFSeller";
import Seller from "./components/Products/Seller/Seller";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<PageLogin />} />
            <Route path="products">
              <Route
                path="home"
                element={<Products children={<HomePage />} />}
              />
              <Route
                path="my-account"
                element={<Products children={<MyAccount />} />}
              />
              <Route
                path="notifications"
                element={<Products children={<Notifications />} />}
              />
              <Route path="purchase-order">
                <Route path="cart" element={<Products children={<Cart />} />} />
                <Route
                  path="payment"
                  element={<Products children={<Payment />} />}
                />
                <Route
                  path="tracking"
                  element={<Products children={<Tracking />} />}
                />
                <Route path="seller">
                  <Route
                    path="RFseller"
                    element={<Products children={<RFSeller />} />}
                  />
                  <Route
                    path="seller"
                    element={<Products children={<Seller />} />}
                  />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<h1>404</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
