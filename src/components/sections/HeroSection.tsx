import React from "react";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-black text-slate-50 scroll-snap-start"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-0"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-start px-8 md:px-20">
        <div className="max-w-2xl space-y-8">
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
            <span className="text-cyberteal">LitBot</span>
            {" - "}
            <span className="text-charcoalBlue">
              Your AI Research Assistant
            </span>
          </h1>
          <p className="text-charcoalBlue md:text-lg leading-relaxed">
            Coming soon. Be one of the first to experience a smarter way to
            review literature.
          </p>

          <div className="flex space-x-4">
            <button className="px-6 py-3 rounded-md bg-cyberteal hover:bg-charcoalBlue hover:text-cyberteal transition-all text-charcoalBlue font-semibold">
              Join the Waiting List
            </button>
            <a
              href="#about"
              className="px-6 py-3 rounded-md border border-charcoalBlue text-charcoalBlue hover:text-cyberteal hover:border-charcoalBlue hover:bg-charcoalBlue transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Optional: Add scroll hints and social icons next */}
    </section>
  );
};

export default HeroSection;
