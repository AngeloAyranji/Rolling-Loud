import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import ParallaxCard from "../components/ParallaxCard";
import Team from "../components/Team";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <div>
      <Helmet>
        <title>SkyShop - Your One-Stop Shop for Drone FPV Items.</title>
      </Helmet>
      <Hero />
      <Tabs />
      <ParallaxCard />
      <Team />
    </div>
  );
}

export default Home;
