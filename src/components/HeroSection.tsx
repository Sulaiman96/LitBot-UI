import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen bg-litbot-background wave-clip-path overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 flex justify-end items-center z-0">
        <img
          src="src/assets/images/hero.png"
          alt=""
          className="h-full w-auto object-contain"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto h-full pt-24 pb-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 h-full items-center">
          <div className="flex flex-col justify-center space-y-6 animate-fade-in">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-litbot-bone tracking-wide leading-tight">
              Meet LitBot
            </h1>
            <p className="text-litbot-bone/90 text-xl md:text-2xl max-w-md">
              Your AI assistant for faster, simpler, smarter literature reviews.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={() => scrollToSection("signup")}
                className="bg-litbot-navy text-litbot-bone hover:bg-litbot-darkbone hover:text-litbot-navy font-medium py-3 px-6 rounded-md transition-colors duration-300"
              >
                Join the Waiting List
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="border-2 border-litbot-bone text-litbot-bone hover:bg-litbot-darkbone hover:border-litbot-darkbone hover:text-litbot-navy py-3 px-6 rounded-md transition-colors duration-300 font-medium"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="flex justify-center md:justify-end relative animate-fade-in-right">
            {/* Empty div to maintain grid structure */}
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/30 hover:bg-white/50 rounded-full p-3 transition-colors duration-300 z-10"
        aria-label="Scroll down"
      >
        <ArrowDown className="text-white" />
      </button>
    </section>
  );
};

export default HeroSection;
