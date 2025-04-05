import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-litbot-background backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <img
              src="src/assets/images/logo.png"
              alt="LitBot Logo"
              className="h-10 w-10"
            />
            <span className="text-litbot-bone font-heading text-3xl tracking-wide">
              LitBot
            </span>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-litbot-bone hover:text-litbot-navy transition-colors font-medium text-xl"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="text-litbot-bone hover:text-litbot-navy transition-colors font-medium text-xl"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("signup")}
            className="bg-litbot-navy text-litbot-bone hover:bg-litbot-darkbone hover:text-litbot-navy transition-colors py-2 px-6 rounded-md font-medium"
          >
            Join Waitlist
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-litbot-bone"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full">
          <div className="flex flex-col py-4 px-6 space-y-3">
            <button
              onClick={() => scrollToSection("about")}
              className="text-left py-2 text-litbot-navy hover:text-litbot-bone transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-left py-2 text-litbot-navy hover:text-litbot-bone transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("signup")}
              className="bg-litbot-navy text-litbot-bone hover:bg-litbot-darkbone hover:text-litbot-navy transition-colors py-2 px-6 rounded-md font-medium w-full text-center"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
