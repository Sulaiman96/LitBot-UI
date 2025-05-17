import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {toast} from "sonner";

type Props = {
  onSwitch: (view: 'login' | 'register' | 'forgot') => void;
};

const Register: React.FC<Props> = ({ onSwitch }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSent, setRegistrationSent] = useState(false);

  const registerURL = `${import.meta.env.VITE_DEV_BACKEND_URL}/auth/register`

  const validate = () => {
    const errs: typeof errors = {};
    if (!firstName) errs.firstName = "First name is required.";
    if (!lastName) errs.lastName = "Last name is required.";
    if (!email) {
      errs.email = "Email is required.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      errs.email = "Invalid email format.";
    }
    if (!password) {
      errs.password = "Password is required.";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    if (!confirmPassword) {
      errs.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Handle register logic here by sending the form data to the server
      const userCreateModel = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      }

      try {
        const response = await fetch(registerURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userCreateModel),
        });

        if (response.ok) {
          toast('User registered successfully! Check your email for verification.');
        } else {
          toast('Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Error registering user:', error);
        toast('An error occurred during registration. Please try again.');
      }
    }
  };

  return (
    <div className="bg-bone-light rounded-xl p-8 pt-0 w-full mx-auto flex flex-col items-center">
      <h2 className="font-taviraj text-3xl mb-6">Register</h2>
      <form className="w-full space-y-4 font-nunito" onSubmit={handleSubmit}>
        <div className="flex space-x-2">
          <div className="w-1/2">
            <label htmlFor="firstName" className="block mb-1 text-sm text-left">First Name</label>
            <Input id="firstName" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bone-dark bg-neutral-lightest" placeholder="First name" />
            {errors.firstName && <div className="text-xs text-red-500 mt-1 text-left">{errors.firstName}</div>}
          </div>
          <div className="w-1/2">
            <label htmlFor="lastName" className="block mb-1 text-sm text-left">Last Name</label>
            <Input id="lastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bone-dark bg-neutral-lightest" placeholder="Last name" />
            {errors.lastName && <div className="text-xs text-red-500 mt-1 text-left">{errors.lastName}</div>}
          </div>
        </div>
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
        <div>
          <label htmlFor="confirmPassword" className="block mb-1 text-sm text-left">Confirm Password</label>
          <Input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bone-dark bg-neutral-lightest" placeholder="Confirm password" />
          {errors.confirmPassword && <div className="text-xs text-red-500 mt-1 text-left">{errors.confirmPassword}</div>}
        </div>
        <button type="submit" className="w-full bg-neutral-darkest text-neutral-lightest font-semibold py-2 rounded mt-2">Register</button>
      </form>
      <div className="mt-4 w-full text-center font-nunito text-sm">
        <span>Already have an account? </span>
        {!registrationSent ? (
            <button type="button" onClick={() => onSwitch('login')} className="text-sky-800 underline bg-transparent p-0">Log in</button>
        ) : (
            <div className="w-full mb-4 font-nunito text-center bg-white/70 rounded p-4 text-sm text-gray-700">
              Check your inbox for a registration email. If you don't see it, check your spam folder or try again with a different email.
            </div>
        )}
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

export default Register; 