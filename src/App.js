import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Footerlogo from "./components/Footerlogo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="bg-[#121212]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      <Footerlogo />
      <Footer />
    </div>
  );
}

export default App;
