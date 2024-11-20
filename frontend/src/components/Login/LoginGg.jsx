import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { loginStart, loginFalse, loginSuccess } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import "./style.css";

const LoginGg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        type="standard"
        logo_alignment="center"
        locale="en"
        click_listener={handleLoginStart}
      />
    </div>
  );
};

export default LoginGg;
