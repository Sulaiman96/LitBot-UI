import { useState } from "react";
import { Input } from "@/components/ui/input";

type Props = {
  onSwitch: (view: 'login' | 'register' | 'forgot') => void;
};

const ForgotPassword: React.FC<Props> = ({ onSwitch }) => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!email) return "Email is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "Invalid email format.";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
    } else {
      setError(null);
      setSubmitted(true);
      // handle forgot password logic here
    }
  };

  return (
    <div className="bg-bone-light rounded-xl p-8 pt-0 w-full mx-auto flex flex-col items-center">
      <h2 className="font-taviraj text-3xl mb-6">Forgot Password</h2>
      {!submitted ? (
        <form className="w-full space-y-4 font-nunito" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">Email</label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 bg-neutral-lightest rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bone-dark" placeholder="Enter your email" />
            {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
          </div>
          <button type="submit" className="w-full  text-neutral-lightest bg-neutral-darkest font-semibold py-2 rounded mt-2">Send Password</button>
        </form>
      ) : (
        <div className="w-full mb-4 font-nunito text-center bg-white/70 rounded p-4 text-sm text-gray-700">
          Check your inbox for a reset email. If you don't see it, check your spam folder or try again with a different email.
        </div>
      )}
      <div className="mt-4 w-full text-center font-nunito text-sm">
        <button type="button" onClick={() => onSwitch('login')} className="text-sky-800 underline bg-transparent p-0">Log in</button>
        <span> or </span>
        <button type="button" onClick={() => onSwitch('register')} className="text-sky-800 underline bg-transparent p-0">Sign up</button>
      </div>
      <div className="mt-4 w-full flex flex-col items-center">
        <span className="text-xs text-gray-500 mb-2">Login with social accounts</span>
        <button className="flex items-center justify-center w-full border border-gray-300 rounded py-2 bg-white hover:bg-gray-50">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword; 