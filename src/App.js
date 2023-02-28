import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Footerlogo from "./components/Footerlogo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="bg-[#121212]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      {location.pathname !== "/login" && (
        <>
          <Footerlogo />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
