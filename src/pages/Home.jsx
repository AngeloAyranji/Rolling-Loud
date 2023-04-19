import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import About from "../components/About";
import ParallaxCard from "../components/ParallaxCard";
import Team from "../components/Team";

function Home() {
  return (
    <div>
      <Hero />
      <Tabs />
      <ParallaxCard />
      <Team />
      <About />
    </div>
  );
}

export default Home;
