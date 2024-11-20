import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart, loginFalse, loginSuccess } from "../../redux/authSlice";

import axiosInstance from "../../services/Axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onButtonClick = () => {
    // Set initial error values to empty
    dispatch(loginStart());
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === email) {
      dispatch(loginFalse());
      setEmailError("Please enter your email");
      return;
    }

    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      dispatch(loginFalse());
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      dispatch(loginFalse());
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 8) {
      dispatch(loginFalse());
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    // Check if email has an account associated with it
    checkAccountExists((accountExists) => {
      // If yes, log in
      if (accountExists) {
        logIn();
      }
      // Else, ask user if they want to create a new account and if yes, then log in
      else {
        dispatch(loginFalse());
        const confirmSignup = window.confirm(
          "An account does not exist with this email address: " +
            email +
            ". Please sign up for an account."
        );
        if (confirmSignup) {
          navigate("/register");
        }
      }
    });
  };

  // Call the server API to check if the given email ID already exists
  const checkAccountExists = (callback) => {
    axiosInstance
      .post("check-account", { email })
      .then((r) => r.data)
      .then((r) => {
        callback(r?.userExists);
      });
  };

  // Log in a user using email and password
  const logIn = () => {
    axiosInstance
      .post("auth", { email, password })
      .then((r) => r.data)
      .then((r) => {
        if ("success" === r.message) {
          console.log("r.payload", r.payload);
          dispatch(loginSuccess({ payload: r.payload, token: r.token }));
          navigate("/");
        } else {
          dispatch(loginFalse());
          window.alert("Wrong email or password");
        }
      });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="d-flex flex-column align-items-center justify-content-center fw-bolder display-1">
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          Please enter your details
        </div>
      </div>
      <br />
      <div className={"inputContainer "}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer "}>
        <input
          className={"inputButton "}
          style={{ borderRadius: "30px", fontSize: "1.2rem" }}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
        <div
          style={{
            display: "inline",
            color: "blue",
            textAlign: "end",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          Forgot password?
        </div>
      </div>
    </div>
  );
};

export default Login;
