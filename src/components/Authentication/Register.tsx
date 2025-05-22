import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Define HomeURL - VITE_APP_URL should be set in your .env file (e.g., VITE_APP_URL=http://localhost:5173)
const HomeURL = import.meta.env.VITE_APP_URL || "http://localhost:5173";

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
  const [registrationSuccessEmail, setRegistrationSuccessEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const registerURL = `${import.meta.env.VITE_DEV_BACKEND_URL}/auth/register`;
  const resendConfirmationURL = `${import.meta.env.VITE_DEV_BACKEND_URL}/auth/resend-confirmation`;

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
    setErrors({});
    if (validate()) {
      setIsLoading(true);
      const userCreateModel = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      };

      try {
        const response = await fetch(registerURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userCreateModel),
        });

        if (response.ok) {
          toast.success('User registered successfully! Check your email for verification.');
          setRegistrationSuccessEmail(email);
          setPassword("");
          setConfirmPassword("");
          // Keep firstName, lastName, email for potential resend or if user made a typo and needs to see it
        } else {
          const errorData = await response.json().catch(() => ({ message: 'Registration failed. Please try again.' }));
          toast.error(errorData.message || 'Registration failed. Please try again.');
          // Optionally set errors from backend if available: setErrors(errorData.errors);
        }
      } catch (error) {
        console.error('Error registering user:', error);
        toast.error('An error occurred during registration. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResendConfirmation = async () => {
    if (!registrationSuccessEmail) return;

    setIsResending(true);
    setResendStatus(null);
    try {
      const response = await fetch(resendConfirmationURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: registrationSuccessEmail, 
          redirect_to: `${HomeURL}/summarization` 
        }),
      });
      if (response.ok) {
        const successMsg = "Confirmation email resent successfully!";
        setResendStatus({ message: successMsg, type: 'success' });
        toast.success(successMsg);
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to resend confirmation email.' }));
        const errorMsg = errorData.message || 'Failed to resend confirmation email. Please try again.';
        setResendStatus({ message: errorMsg, type: 'error' });
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Error resending confirmation:', error);
      const errorMsg = 'An unexpected error occurred. Please try again.';
      setResendStatus({ message: errorMsg, type: 'error' });
      toast.error(errorMsg);
    } finally {
      setIsResending(false);
    }
  };

  if (registrationSuccessEmail) {
    return (
      <div className="bg-bone-light rounded-xl p-8 pt-0 w-full mx-auto flex flex-col items-center text-center font-nunito">
        <h2 className="font-taviraj text-3xl mt-6 mb-4">Registration Successful!</h2>
        <p className="mb-4 text-sm">
          A confirmation email has been sent to <strong className="text-neutral-darkest">{registrationSuccessEmail}</strong>.
          Please check your inbox (and spam folder) to activate your account.
        </p>
        {resendStatus && (
          <div className={`w-full my-2 p-3 rounded text-sm ${resendStatus.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
            {resendStatus.message}
          </div>
        )}
        <button 
          type="button" 
          onClick={handleResendConfirmation} 
          disabled={isResending}
          className="w-full cursor-pointer text-neutral-lightest bg-neutral-darkest font-semibold py-2 rounded mt-2 disabled:opacity-50">
          {isResending ? 'Sending...' : 'Resend Confirmation Email'}
        </button>
        <div className="mt-6 w-full text-center font-nunito text-sm">
          <button type="button" onClick={() => onSwitch('login')} className="text-sky-800 cursor-pointer underline bg-transparent p-0">
            Proceed to Log in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bone-light rounded-xl p-8 pt-0 w-full mx-auto flex flex-col items-center">
      <h2 className="font-taviraj text-3xl mb-6">Register</h2>
      <form className="w-full space-y-4 font-nunito" onSubmit={handleSubmit}>
        {/* Form inputs remain the same as before */}
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
          <Input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 rounded borderborder-gray-300 focus:outline-none focus:ring-2 focus:ring-bone-dark bg-neutral-lightest" placeholder="Confirm password" />
          {errors.confirmPassword && <div className="text-xs text-red-500 mt-1 text-left">{errors.confirmPassword}</div>}
        </div>
        <button type="submit" className={"w-full bg-neutral-darkest text-neutral-lightest font-semibold py-2 rounded mt-2" + (isLoading ? ' cursor-not-allowed' : ' cursor-pointer')} disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="mt-4 w-full text-center font-nunito text-sm">
        <span>Already have an account? </span>
        <button type="button" onClick={() => onSwitch('login')} className="text-sky-800 cursor-pointer underline bg-transparent p-0">Log in</button>
      </div>
      <div className="mt-4 w-full flex flex-col items-center">
        <span className="text-xs text-gray-500 mb-2">Login with social accounts</span>
        <button className="flex cursor-pointer items-center justify-center w-full border border-gray-300 rounded py-2 bg-white hover:bg-gray-50">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Register;