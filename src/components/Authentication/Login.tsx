const Login = () => {
  return (
    <div className="bg-bone-light rounded-xl shadow-md p-8 w-full max-w-md mx-auto flex flex-col items-center">
      <h2 className="font-taviraj text-3xl mb-6">Login</h2>
      <form className="w-full space-y-4 font-nunito">
        <div>
          <label htmlFor="email" className="block mb-1 text-sm">Email</label>
          <input id="email" type="email" className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bone-dark" placeholder="Enter your email" />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 text-sm">Password</label>
          <input id="password" type="password" className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bone-dark" placeholder="Password" />
        </div>
        <div className="flex items-center justify-between">
          <a href="#" className="text-xs text-bone-dark hover:underline">Forgot password?</a>
        </div>
        <button type="submit" className="w-full bg-bone-dark text-outer-space font-semibold py-2 rounded mt-2">Sign in</button>
      </form>
      <div className="mt-4 w-full text-center font-nunito text-sm">
        <span>Don't have an account? </span>
        <a href="#" className="text-bone-dark hover:underline">Sign up</a>
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