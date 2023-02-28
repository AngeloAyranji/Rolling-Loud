import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Loading from "./components/Loading";
import Product from "./pages/Product";
import Footerlogo from "./components/Footerlogo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Register from "./pages/Register";
import ForgotEmail from "./pages/ForgotEmail";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <div className="bg-[#121212]">
      <Navbar />
      <Home />
      <Banner />
      <Footerlogo />
      <Footer />
    </div>
  );
}

export default App;
