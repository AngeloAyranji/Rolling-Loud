import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import ForgotEmail from "./pages/ForgotEmail";
import ForgotPassword from "./pages/ForgotPassword";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./layout/scrollToTop";
import Layout from "./layout/layout";

function App() {

  return (
    <div className="bg-[#121212]">
      <ScrollToTop>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetPassword" element={<ForgotPassword />} />
            <Route path="/forgetEmail" element={<ForgotEmail />} />
            <Route path="/product/:productName" element={<Product />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<Products />} />
            {/* <Route path="*" element={} /> */}
          </Routes>
        </Layout>
      </ScrollToTop>
    </div>
  );
}

export default App;
