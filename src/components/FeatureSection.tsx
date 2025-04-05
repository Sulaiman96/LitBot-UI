import { useEffect, useRef } from "react";
import { features } from "@/data/features";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FeatureSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
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
      observer.observe(el);
    });

    return () => {
      fadeElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="features" className="section bg-litbot-bone/30 py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-in-section">
          <h2 className="font-heading text-litbot-navy text-4xl md:text-5xl tracking-wide mb-6">
            Features
          </h2>
          <p className="text-litbot-slate text-xl max-w-3xl mx-auto">
            LitBot comes equipped with powerful tools to simplify your research
            process and help you focus on what matters most.
          </p>
        </div>

        <div className="max-w-3xl mx-auto fade-in-section">
          <Accordion type="single" collapsible className="w-full">
            {features.map((feature, index) => (
              <AccordionItem
                key={feature.id}
                value={`item-${index}`}
                className="border border-litbot-teal/20 mb-4 rounded-lg overflow-hidden bg-white"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-litbot-teal/5">
                  <div className="flex items-center gap-3 text-left">
                    <div className="p-2 bg-litbot-teal/10 rounded-full">
                      <feature.icon className="text-litbot-teal" size={24} />
                    </div>
                    <span className="text-lg font-medium text-litbot-navy">
                      {feature.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-litbot-slate">
                  {feature.full}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center fade-in-section">
          <p className="text-litbot-slate italic">
            More features coming soon as we continue development...
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
