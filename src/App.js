import Home from "./pages/Home";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Order from "./pages/Order";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotEmail from "./pages/ForgotEmail";
import ForgotPassword from "./pages/ForgotPassword";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from "./layout/scrollToTop";
import Layout from "./layout/layout";
import Brands from "./pages/Brands";
import SelectCountry from "./pages/SelectCountry";

function App() {
  const location = useLocation();

  return (
    <div className="bg-[#121212]">
      <ScrollToTop>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country" element={<SelectCountry />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetPassword" element={<ForgotPassword />} />
            <Route path="/forgetEmail" element={<ForgotEmail />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/product/:productName" element={<Product />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/products/:category/:subcategory" element={<Products />} />
            <Route
              path="/orders"
              element={
                sessionStorage.getItem("jwt") ? (
                  <Orders />
                ) : (
                  <Navigate to={"/login"} state={{ from: location }} />
                )
              }
            />
            <Route
              path="/orders/:orderId"
              element={
                sessionStorage.getItem("jwt") ? (
                  <Order />
                ) : (
                  <Navigate to={"/login"} state={{ from: location }} />
                )
              }
            />
            {/* <Route path="*" element={} /> */}
          </Routes>
        </Layout>
      </ScrollToTop>
    </div>
  );
}

export default App;
