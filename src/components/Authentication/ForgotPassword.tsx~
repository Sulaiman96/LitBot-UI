import { useState, useEffect } from "react";
import { useSearchParams } from "react-router"; // Make sure react-router-dom is installed
import { Input } from "@/components/ui/input";

// Define HomeURL - VITE_APP_URL should be set in your .env file (e.g., VITE_APP_URL=http://localhost:5173)
const HomeURL = import.meta.env.VITE_APP_URL || "http://localhost:5173";

type Props = {
  onSwitch: (view: 'login' | 'register' | 'forgot') => void;
};

const ForgotPassword: React.FC<Props> = ({ onSwitch }) => {
  const [searchParams] = useSearchParams();

  const [viewMode, setViewMode] = useState<'forgot' | 'reset'>('forgot');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedForgot, setSubmittedForgot] = useState(false);

  useEffect(() => {
    const action = searchParams.get("action");
    if (action === "reset-password") {
      setViewMode('reset');
      setMessage("Please enter your new password.");
      setError(null);
    }
  }, [searchParams]);

  const validateEmail = () => {
    if (!email) return "Email is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return "Invalid email format.";
    return null;
  };

  const validatePasswords = () => {
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters long.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const emailError = validateEmail();
    if (emailError) {
      setError(emailError);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}/auth/password/forgot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          redirect_to: `${HomeURL}/account?action=reset-password`
        }),
      });

      let data;
      try {
        // Try to parse JSON, but handle cases where backend might send non-JSON or empty success
        if (response.headers.get("content-type")?.includes("application/json")) {
          data = await response.json();
        } else if (response.ok) { // If response is OK but not JSON (e.g. 204 No Content)
          setSubmittedForgot(true);
          setMessage("If an account exists for this email, a password reset link has been sent. Please check your inbox (and spam folder).");
          setEmail("");
          setIsLoading(false);
          return;
        } else { // Not OK and not JSON
           throw new Error(`Server responded with status: ${response.status}`);
        }
      } catch (parseError) {
        console.error("API response parsing error or non-JSON response:", parseError, response.status);
        if (!response.ok) {
          setError(`Request failed with status ${response.status}. Please try again.`);
        } else {
          // This case might occur if response.ok but content-type was not application/json and it wasn't handled above
          setMessage("Password reset email request sent. Check your inbox.");
          setSubmittedForgot(true);
          setEmail("");
        }
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        setError(data?.message || data?.error?.message || data?.error || "Failed to send reset email. Please try again.");
      } else {
        setSubmittedForgot(true);
        setMessage(data?.message || "If an account exists for this email, a password reset link has been sent. Please check your inbox (and spam folder).");
        setEmail("");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const passwordError = validatePasswords();
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}/auth/password/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // If your backend expects a token (e.g., from Supabase client session) for reset, include it here
          // 'Authorization': `Bearer YOUR_ACCESS_TOKEN_IF_NEEDED`
        },
        body: JSON.stringify({ password }),
      });

      let data;
      try {
        if (response.headers.get("content-type")?.includes("application/json")) {
            data = await response.json();
        } else if (response.ok) {
            setMessage("Password has been reset successfully! You can now log in.");
            setPassword("");
            setConfirmPassword("");
            setError(null);
            setIsLoading(false);
            return;
        } else {
            throw new Error(`Server responded with status: ${response.status}`);
        }
      } catch (parseError) {
        console.error("API response parsing error or non-JSON response:", parseError, response.status);
        if (!response.ok) {
          setError(`Request failed with status ${response.status}. Please try again.`);
        } else {
          setMessage("Password reset successfully! You can now log in.");
          setPassword("");
          setConfirmPassword("");
        }
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        setError(data?.message || data?.error?.message || data?.error || "Failed to reset password. The link may be invalid or expired.");
      } else {
        setMessage(data?.message || "Password has been reset successfully! You can now log in with your new password.");
        setPassword("");
        setConfirmPassword("");
        setError(null);
        // Optionally, clear the 'action' param from URL or switch view
        // window.history.replaceState({}, document.title, window.location.pathname.split('?')[0]);
        // onSwitch('login');
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (viewMode === 'reset') {
    return (
      <div className="bg-bone-light rounded-xl p-8 pt-0 w-full mx-auto flex flex-col items-center">
        <h2 className="font-taviraj text-3xl mb-6">Reset Password</h2>
        {message && !error && <div className="w-full mb-4 font-nunito text-center bg-green-100 border border-green-400 text-green-700 rounded p-4 text-sm">{message}</div>}
        {error && <div className="w-full mb-4 font-nunito text-center bg-red-100 border border-red-400 text-red-700 rounded p-4 text-sm">{error}</div>}

        <form className="w-full space-y-4 font-nunito" onSubmit={handleResetPasswordSubmit}>
          <div>
            <label htmlFor="password_new" className="block mb-1 text-sm text-left">New Password</label>
            <Input
              id="password_new"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-lightest rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bone-dark"
              placeholder="Enter new password"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label htmlFor="confirm_password" className="block mb-1 text-sm text-left">Confirm New Password</label>
            <Input
              id="confirm_password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-lightest rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bone-dark"
              placeholder="Confirm new password"
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="w-full cursor-pointer text-neutral-lightest bg-neutral-darkest font-semibold py-2 rounded mt-2" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Set New Password'}
          </button>
        </form>
        <div className="mt-4 w-full text-center font-nunito text-sm">
          <button type="button" onClick={() => { onSwitch('login'); if (typeof window !== 'undefined') window.history.replaceState({}, document.title, window.location.pathname.split('?')[0]); }} className="text-sky-800 cursor-pointer underline bg-transparent p-0">Back to Log in</button>
        </div>
      </div>
    );
  }

  // Forgot Password Form
  return (
    <div className="bg-bone-light rounded-xl p-8 pt-0 w-full mx-auto flex flex-col items-center">
      <h2 className="font-taviraj text-3xl mb-6">Forgot Password</h2>
      {!submittedForgot ? (
        <form className="w-full space-y-4 font-nunito" onSubmit={handleForgotPasswordSubmit}>
          <div>
            <label htmlFor="email_forgot" className="block mb-1 text-sm text-left">Email</label>
            <Input
              id="email_forgot"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-lightest rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bone-dark"
              placeholder="Enter your email"
              autoComplete="email"
            />
            {/* Show specific email validation error directly under input */}
            {error && error.toLowerCase().includes("email") && <div className="text-xs text-red-500 mt-1">{error}</div>}
          </div>
          <button type="submit" className="w-full cursor-pointer text-neutral-lightest bg-neutral-darkest font-semibold py-2 rounded mt-2" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
      ) : (
        <div className="w-full mb-4 font-nunito text-center bg-white/70 rounded p-4 text-sm text-gray-700">
          {message} {/* Show success message after submission */}
        </div>
      )}

      {/* General message/error display area for forgot password form */}
      {message && !error && !submittedForgot && viewMode === 'forgot' && (
         <div className="w-full my-2 font-nunito text-center bg-green-100 border border-green-400 text-green-700 rounded p-2 text-sm">{message}</div>
      )}
      {/* Show non-email related errors or general errors here */}
      {error && !error.toLowerCase().includes("email") && !submittedForgot && viewMode === 'forgot' && (
         <div className="w-full my-2 font-nunito text-center bg-red-100 border border-red-400 text-red-700 rounded p-2 text-sm">{error}</div>
      )}

      <div className="mt-4 w-full text-center font-nunito text-sm">
        <button type="button" onClick={() => onSwitch('login')} className="text-sky-800 cursor-pointer underline bg-transparent p-0">Log in</button>
        <span> or </span>
        <button type="button" onClick={() => onSwitch('register')} className="text-sky-800 cursor-pointer underline bg-transparent p-0">Sign up</button>
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

export default ForgotPassword;