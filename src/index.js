import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import App from "./App";
import { persistor, store } from "./redux/store";
import { RegionCheckerProvider } from "./hooks/regionChecker";
import { AuthCheckerProvider } from "./hooks/authChecker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate loading={"loading"} persistor={persistor}>
        <BrowserRouter>
          <AuthCheckerProvider>
            <RegionCheckerProvider>
              <App />
            </RegionCheckerProvider>
          </AuthCheckerProvider>
        </BrowserRouter>
      </PersistGate>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
