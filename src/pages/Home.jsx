import React from "react";
import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import About from "../components/About";
import Banner from "../components/Banner";
import ParallaxCard from "../components/ParallaxCard";

function Home() {
  return (
    <div>
      <Hero />
      <Tabs />
      <ParallaxCard />
      <About />
    </div>
  );
}

export default Home;
