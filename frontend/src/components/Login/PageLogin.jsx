import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/image/logo.png";
import Login from "./Login";
import LoginGg from "./LoginGg";

const PageLogin = () => {
  return (
    <div className="mainContainer">
      <div className="login-left">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="login-right">
        <div className="titleContainer text-center mb-4">
          <div>Delivery Drones Service</div>
        </div>

        <Login />
        <div>
          <span className="dashed-line">Or</span>
        </div>
        <LoginGg />
        <Link to="/register">
          <div
            className="style_bottom"
          >
            Don't have an account?{" "}
            <p style={{ display: "inline", color: "blue"}}>Sign Up</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PageLogin;
