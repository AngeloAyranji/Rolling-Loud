import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Footerlogo from "./components/Footerlogo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import ForgotEmail from "./pages/ForgotEmail";
import ForgotPassword from "./pages/ForgotPassword";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="bg-[#121212]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPassword" element={<ForgotPassword />} />
        <Route path="/forgetEmail" element={<ForgotEmail />} />
        <Route path="/product" element={<Product />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      {(location.pathname !== "/login" && location.pathname !== "/register") && (
        <>
          <Banner />
          <Footerlogo />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
