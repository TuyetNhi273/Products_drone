import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./home";
import Register from "./components/Register/Register";
import Products from "./Products";
import HomePage from "./components/Products/HomePage";
import MyAccount from "./components/Products/MyAccounts";
import Notifications from "./components/Products/Notifications";
import Cart from "./components/Products/Purchase/Cart";
import Payment from "./components/Products/Purchase/Payment";
import Tracking from "./components/Products/Purchase/Tracking";
import PurchaseOrder from "./components/Products/PurchaseOrder";
import Seller from "./components/Products/Seller";
import "./App.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  const userLocal = useSelector((state) => state.auth.login.currentUser);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(userLocal?.email || "");

  useEffect(() => {
    // check data when reload
    if (!userLocal || !userLocal.token) {
      setLoggedIn(false);
      return;
    }

    fetch("http://localhost:3080/verify", {
      method: "POST",
      headers: {
        "jwt-token": userLocal.token,
      },
      credentials: "include", // for Chrome
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }

        throw new Error("Failed to verify");
      })
      .then((r) => {
        if (r.message === "success") {
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoggedIn(false);
      });
  }, [userLocal]); // add userLocal as dependency to useEffect hook

  useEffect(() => {
    setEmail(userLocal?.email);
  }, [userLocal]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              userLocal !== null ? (
                <Navigate to="/products/home" replace />
              ) : (
                <Navigate to="/products/home" replace />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Home
                email={email}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />

          {/* Route bảo vệ cho Products */}
          <Route
            path="/products/*"
            element={
              userLocal !== null ? (
                <Products />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="my-account" element={<MyAccount />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="purchase-order" element={<PurchaseOrder />}>
              <Route index element={<Navigate to="cart" />} />{" "}
              <Route path="cart" element={<Cart />} />
              <Route path="payment" element={<Payment />} />
              <Route path="tracking" element={<Tracking />} />
            </Route>
            <Route path="seller" element={<Seller />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
