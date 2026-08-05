import Hero from "./components/Hero";
import ProductViewer from "./components/ProductViewer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Showcase from "./components/Showcase";
import Performance from "./components/Performance";
import Features from "./components/Features";
import Highlights from "./components/Highlights";
import LanguageSwitcher from "./components/LanguageSwitcher";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <main>
      <LanguageSwitcher />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Features />
      <Highlights />
    </main>
  );
};

export default App;
