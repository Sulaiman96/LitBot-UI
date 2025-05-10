import { Mail, Linkedin } from "lucide-react";
import Logo from "@/assets/images/logo.png";
import Sully from "@/assets/images/team/sully.jpg";
import Mutti from "@/assets/images/team/mutti.jpeg";
import Addy from "@/assets/images/team/addy.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bone-dark py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <a
              href="https://www.linkedin.com/company/litbot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mb-4 hover:opacity-90"
            >
              <img src={Logo} alt="LitBot Logo" className="h-10 w-auto mr-3" />
              <span className="font-heading text-2xl tracking-wide text-litbot-navy">
                LitBot
              </span>
            </a>
            <p className="text-sm text-litbot-background max-w-xs">
              Helping researchers summarise, search, and compare academic papers
              faster using AI.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-litbot-navy">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-litbot-background">
              <li>
                <a href="#features" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#signup" className="hover:underline">
                  Join Waitlist
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-litbot-navy">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-litbot-background">
              <li>
                <a href="#" className="hover:underline">
                  Blog (Coming Soon)
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col justify-start space-y-3">
            <h4 className="text-lg font-semibold text-litbot-navy">Connect</h4>

            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/company/litbot"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 text-litbot-background"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:support@litbotapp.com"
                className="hover:opacity-80 text-litbot-background"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <span className="text-sm text-litbot-background ml-2">
                support@litbotapp.com
              </span>
            </div>

            <div className="flex space-x-3 pt-1">
              <a
                href="https://www.linkedin.com/in/sulaimanmaarij"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={Sully}
                  alt="Sulaiman Maarij"
                  className="w-9 h-9 rounded-full border-2 border-litbot-background hover:scale-105 transition-transform"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/mustafaanweralkhafaji/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={Mutti}
                  alt="Dr. Mustafa Al Khafaji"
                  className="w-9 h-9 rounded-full border-2 border-litbot-background hover:scale-105 transition-transform"
                />
              </a>
              <a
                  href="https://www.linkedin.com/in/adamabu/"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <img
                    src={Addy}
                    alt="Mr. Adam Abubakari"
                    className="w-9 h-9 rounded-full border-2 border-litbot-background hover:scale-105 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-litbot-background/20 pt-6 text-center text-sm text-litbot-background/80">
          &copy; {currentYear} LitBot. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
