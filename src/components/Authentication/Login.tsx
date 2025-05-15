import React, { useState } from "react";
import { Input } from "@/components/ui/input";

type Props = {
  onSwitch: (view: 'login' | 'register' | 'forgot') => void;
};

const Login: React.FC<Props> = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email) {
      errs.email = "Email is required.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      errs.email = "Invalid email format.";
    }
    if (!password) {
      errs.password = "Password is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // handle login logic here
    }
  };

  return (
    <div className="bg-bone-light rounded-xl p-8 pt-0 w-full mx-auto flex flex-col items-center">
      <h2 className="font-taviraj text-3xl mb-6">Login</h2>
      <form className="w-full space-y-4 font-nunito" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block mb-1 text-sm text-left">Email</label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bone-dark bg-neutral-lightest" placeholder="Enter your email" />
          {errors.email && <div className="text-xs text-red-500 mt-1 text-left">{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 text-sm text-left">Password</label>
          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bone-dark bg-neutral-lightest" placeholder="Password" />
          {errors.password && <div className="text-xs text-red-500 mt-1 text-left">{errors.password}</div>}
        </div>
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => onSwitch('forgot')} className="text-xs text-sky-800 underline bg-transparent p-0">Forgot password?</button>
        </div>
        <button type="submit" className="w-full bg-neutral-darkest text-neutral-lightest font-semibold py-2 rounded mt-2">Sign in</button>
      </form>
      <div className="mt-4 w-full text-center font-nunito text-sm">
        <span>Don't have an account? </span>
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

export default Login;