import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Simple toast implementation (reused from Signup page for consistency)
const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 px-4 py-2 rounded shadow z-50 text-white ${
      type === "error" ? "bg-red-600" : "bg-green-600"
    }`}
  >
    {message}
    <button onClick={onClose} className="ml-4 font-bold">
      X
    </button>
  </div>
);

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  // Use the auth context
  const { login, isLoading, isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/search");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      const newErrors = { ...errors };
      delete newErrors[e.target.name];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Call the login function from auth context
      console.log("Logging in with:", formData);
      const result = await login(formData.email, formData.password);

      if (result.success) {
        setToast({ message: "Login successful!", type: "success" });
        navigate("/search"); // Redirect to search page after login
      } else {
        setToast({ message: result.message || "Login failed", type: "error" });
      }
    } catch (error) {
      console.error("Login error:", error);
      setToast({ message: "Login failed. Please try again.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff8f8] to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
   

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your Ujwal Bandhan account
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 bg-gradient-to-r from-[#d42a3c] to-[#ff6b6b] rounded-full"></div>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white py-8 px-6 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border pl-10 px-4 py-3 shadow-sm focus:ring-[#d42a3c] focus:border-[#d42a3c] ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password" // Replace with actual forgot password link if implemented
                    className="text-sm text-[#d42a3c] hover:text-[#b21e2f] font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border pl-10 px-4 py-3 shadow-sm focus:ring-[#d42a3c] focus:border-[#d42a3c] ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 rounded-md bg-[#d42a3c] hover:bg-[#b21e2f] text-white font-medium text-base shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#d42a3c] focus:ring-opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link to="/signup" className="block w-full">
                  <button className="w-full px-4 py-3 rounded-md border border-[#d42a3c] text-[#d42a3c] bg-white hover:bg-[#fdf2f4] font-medium text-base transition-all focus:outline-none focus:ring-2 focus:ring-[#d42a3c] focus:ring-opacity-50">
                    Create an account
                  </button>
                </Link>
              </div>
            </div>

            {/* API Status Checker */}
            <div className="mt-8 border-t pt-4">
              <details className="text-sm text-gray-500">
                <summary className="cursor-pointer hover:text-[#d42a3c] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Having trouble? Check connection status
                </summary>
                <div className="pt-2">
                  <p className="text-gray-700">
                    API Status:{" "}
                    <span className="font-semibold text-green-600">
                      Checking...
                    </span>
                  </p>
                  <p className="mt-2 text-xs">
                    If connection issues persist, please make sure the backend
                    server is running and refresh this page.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
