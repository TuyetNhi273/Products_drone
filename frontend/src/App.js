import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Register from "./components/Register/Register";
import PageLogin from "./components/Login/PageLogin";
import MyAccount from "./components/Products/MyAccounts";
import Products from "./Products";
import Home from "./Home";

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
              <Route path="home" element={<Products />} />
              <Route
                path="my-account"
                element={<Products children={<MyAccount />} />}
              />
            </Route>
            <Route path="*" element={<h1>404</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
