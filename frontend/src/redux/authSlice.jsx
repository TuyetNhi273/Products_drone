import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isfetching: false,
      error: false,
    },
    register: {
      success: false,
      isfetching: false,
      error: false,
    },
    RFseller: {
      success: null,
      isfetching: false,
      error: false,
    },
    ItemCart:{
      isfetching: false,
      error: false,
      success: null,
    }
  },
  reducers: {
    loginStart: (state) => {
      state.login.isfetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isfetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFalse: (state) => {
      state.login.isfetching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isfetching = true;
    },
    registerSuccess: (state) => {
      state.register.isfetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    registerFalse: (state) => {
      state.register.isfetching = false;
      state.register.error = true;
      state.register.success = false;
    },
    RFsellerStart: (state) => {
      state.RFseller.isfetching = true;
    },
    RFsellerSuccess: (state, action) => {
      state.RFseller.isfetching = false;
      state.RFseller.success = action.payload;
      state.RFseller.error = false;
    },
    RFsellerFalse: (state) => {
      state.RFseller.isfetching = false;
      state.RFseller.error = true;
    },
    ItemCartStart: (state) => {
      state.ItemCart.isfetching = true;
    },
    ItemCartSuccess: (state, action) => {
      state.ItemCart.isfetching = false;
      state.ItemCart.success = action.payload;
      state.ItemCart.error = false;
    },
    ItemCartFalse: (state) => {
      state.ItemCart.isfetching = false;
      state.ItemCart.error = true;
    },
  },
});

export const {
  loginStart,
  loginFalse,
  loginSuccess,
  registerStart,
  registerFalse,
  registerSuccess,
  RFsellerStart,
  RFsellerFalse,
  RFsellerSuccess,
  ItemCartStart,
  ItemCartSuccess,
  ItemCartFalse,
} = authSlice.actions;

export default authSlice.reducer;
