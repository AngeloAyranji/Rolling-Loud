import React from "react";
import Navbar from "../components/Navbar";
import Footerlogo from "../components/Footerlogo";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import About from "../components/About";
import Banner from "../components/Banner";

function Home() {
  return (
    <div>
      <Hero />
      <Tabs />
      <About />
    </div>
  );
}

export default Home;
