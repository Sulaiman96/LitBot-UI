import { useEffect, useRef, useState } from "react";
import { features } from "@/data/features";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const fadeElements = document.querySelectorAll(".fade-in-section");
    fadeElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        fadeElements.forEach((el) => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else {
        setCardsPerView(3);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? features.length - cardsPerView : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex + 1) % (features.length - cardsPerView + 1)
    );
  };

  return (
    <section id="about" className="section bg-white py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-in-section">
          <h2 className="font-heading text-litbot-navy text-4xl md:text-5xl tracking-wide mb-6">
            About LitBot
          </h2>
          <p className="text-litbot-slate text-xl max-w-3xl mx-auto">
            Making research more human, focusing on thinkers, not just output.
            LitBot empowers researchers without replacing them.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-8 bg-white p-2 rounded-full shadow-md z-10 focus:outline-none focus:ring-2 focus:ring-litbot-teal hover:transform hover:scale-105 transition-transform"
            aria-label="Previous Features"
            onClick={handlePrevious}
          >
            <span className="text-litbot-navy text-xl">◀</span>
          </button>

          <div className="overflow-hidden py-4">
            <div
              id="feature-carousel"
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  activeIndex * (100 / cardsPerView)
                }%)`,
              }}
              aria-live="polite"
              role="region"
              aria-roledescription="carousel"
            >
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="flex-shrink-0 w-full md:w-1/3 px-4 fade-in-section py-2"
                  aria-hidden={
                    index < activeIndex || index >= activeIndex + cardsPerView
                  }
                  role="group"
                  aria-roledescription="slide"
                >
                  <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
                    <div className="bg-litbot-teal/10 p-4 rounded-full mb-4">
                      <feature.icon size={32} className="text-litbot-teal" />
                    </div>
                    <h3 className="text-litbot-navy text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-litbot-slate">{feature.short}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-8 bg-white p-2 rounded-full shadow-md z-10 focus:outline-none focus:ring-2 focus:ring-litbot-teal hover:transform hover:scale-105 transition-transform"
            aria-label="Next Features"
            onClick={handleNext}
          >
            <span className="text-litbot-navy text-xl">▶</span>
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: features.length - cardsPerView + 1 }).map(
              (_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full mx-1 transition-colors duration-300 ${
                    index === activeIndex
                      ? "bg-litbot-teal"
                      : "bg-litbot-teal/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                />
              )
            )}
          </div>
        </div>

        <div className="mt-24 max-w-4xl mx-auto fade-in-section">
          <h3 className="font-heading text-litbot-navy text-3xl tracking-wide mb-8 text-center">
            Meet Our Team
          </h3>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="flex flex-col items-center text-center">
              <img
                src="src/assets/images/team/sully.jpg"
                alt="Mr. Sulaiman Maarij"
                className="w-32 h-32 rounded-full object-cover border-2 border-litbot-teal/20 mb-4"
              />
              <h4 className="text-litbot-navy text-xl font-semibold">
                Mr. Sulaiman Maarij
              </h4>
              <p className="text-litbot-slate/80 text-sm mb-3">
                Co-founder & AI Solution Architect
              </p>
              <p className="text-litbot-slate">
                Leads the architecture and development of LitBot, designing the
                AI solution, building the platform, enabling APIs and
                contributing to model training. With a strong background in
                software engineering, focuses on transforming complex systems
                into seamless tools for researchers.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src="src/assets/images/team/mutti.jpeg"
                alt="Dr. Mustafa A. Al Khafaji"
                className="w-32 h-32 rounded-full object-cover border-2 border-litbot-teal/20 mb-4"
              />
              <h4 className="text-litbot-navy text-xl font-semibold">
                Dr. Mustafa A. Al Khafaji
              </h4>
              <p className="text-litbot-slate/80 text-sm mb-3">
                Co-founder & Academic Research Advisor
              </p>
              <p className="text-litbot-slate">
                Guides how LitBot serves researchers by fine-tuning the model to
                academic niches and ensuring the results meet the quality,
                rigour and integrity scholars expect. Plays a key role in
                aligning the tool with the real needs of the research community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
