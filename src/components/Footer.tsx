import { GraduationCap, Mail, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-litbot-teal text-litbot-bone py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <GraduationCap size={32} className="mr-3" />
            <span className="font-heading text-2xl tracking-wide">LitBot</span>
          </div>

          <div className="flex space-x-6">
            <a
              href="#"
              className="hover:text-litbot-sky transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="#"
              className="hover:text-litbot-sky transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="hover:text-litbot-sky transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-litbot-bone/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; {currentYear} LitBot. All rights reserved.
            </p>

            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm hover:text-litbot-sky transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm hover:text-litbot-sky transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm hover:text-litbot-sky transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
