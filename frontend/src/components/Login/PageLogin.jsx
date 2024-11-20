import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/image/logo.png";
import Login from "./Login";
import LoginGg from "./LoginGg";

const PageLogin = () => {
  return (
    <div className="mainContainer">
      <div className="login-right">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="login-left">
        <div className="titleContainer text-center mb-4">
          <div>Delivery Drones Service</div>
        </div>

        <Login />
        <div className="mt-4 d-flex justify-content-center align-items-center">
          <span className="dashed-line">Or</span>
        </div>
        <LoginGg />
        <Link to="/register">
          <div
            style={{
              marginTop: "1rem",
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            Don't have an account?{" "}
            <p style={{ display: "inline", color: "blue" }}>Sign Up</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PageLogin;
