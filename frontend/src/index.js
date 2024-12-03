import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId="903123248098-btaq0bedqajlfq8e3oq3c7o69ombbjo3.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
