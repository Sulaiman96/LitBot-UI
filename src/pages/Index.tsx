import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeatureSection from "@/components/FeatureSection";
import SignupSection from "@/components/SignupSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Add scroll event listener to handle fade-in animations
    const handleScroll = () => {
      const fadeElements = document.querySelectorAll(".fade-in-section");
      fadeElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;

        // If element is in viewport
        if (elementTop < window.innerHeight - elementHeight / 3) {
          element.classList.add("is-visible");
        }
      });
    };

    // Initial check for elements in viewport on load
    setTimeout(handleScroll, 300);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeatureSection />
      <SignupSection />
      <Footer />
    </div>
  );
};

export default Index;
