import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitToWaitList } from "@/services/waitlistService";

const SignupSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profession: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitToWaitList(formData);

      toast({
        title: "Thanks for joining our waitlist!",
        description: "You'll be the first to know when LitBot is ready.",
      });

      setFormData({ name: "", email: "", profession: "" });
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="signup" className="section bg-white py-16">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="font-heading text-litbot-navy text-4xl md:text-5xl tracking-wide mb-6">
              Join the Waitlist
            </h2>
            <p className="text-litbot-slate text-xl">
              Be among the first to experience LitBot when we launch early
              access.
            </p>
          </div>

          <div className="bg-litbot-bone/30 p-8 md:p-12 rounded-xl shadow-md fade-in-section">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-litbot-navy font-medium"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md border border-litbot-teal/20 focus:outline-none focus:ring-2 focus:ring-litbot-teal/50"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-litbot-navy font-medium"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md border border-litbot-teal/20 focus:outline-none focus:ring-2 focus:ring-litbot-teal/50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="profession"
                  className="block text-litbot-navy font-medium"
                >
                  Profession
                </label>
                <select
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-litbot-teal/20 focus:outline-none focus:ring-2 focus:ring-litbot-teal/50"
                >
                  <option value="" disabled>
                    Select your profession
                  </option>
                  <option value="academic_researcher">
                    Academic Researcher
                  </option>
                  <option value="phd_student">PhD Student</option>
                  <option value="masters_student">Master's Student</option>
                  <option value="undergraduate">Undergraduate Student</option>
                  <option value="industry_researcher">
                    Industry Researcher
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-litbot-navy hover:bg-litbot-darkbone hover:text-litbot-navy w-full flex justify-center items-center text-litbot-bone font-medium py-3"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 rounded-full border-t-2 border-b-2 border-litbot-navy animate-spin"></div>
                  ) : (
                    "Join Waitlist"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center text-litbot-slate fade-in-section">
            <p>
              By joining the waitlist, you'll get updates on our development
              progress and be first in line when we launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupSection;
