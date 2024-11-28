import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { loginStart, loginFalse, loginSuccess } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import "../../App.css";

const LoginGg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [type, setType] = useState(window.innerWidth < 576 ? "icon" : "standard");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setType("icon");
      } else {
        setType("standard");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLoginStart = () => {
    dispatch(loginStart());
  };

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log(decoded); // Hiển thị JWT đã giải mã

    navigate("/");

    dispatch(loginSuccess(decoded));
  };

  const handleLoginError = () => {
    dispatch(loginFalse());
    console.log("Login Failed");
  };

  return (
    <div className="style-login-gg">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        width={"384px"}
        shape="circle"
        size="large"
        type={type}
        logo_alignment="center"
        locale="en"
        click_listener={handleLoginStart}
      />
    </div>
  );
};

export default LoginGg;


