import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Simple toast implementation (reused for consistency)
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

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    location: "", // Optional fields
    religion: "", // Optional fields
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null); // State for image file
  const [imagePreview, setImagePreview] = useState(null); // State for image preview URL
  const fileInputRef = useRef(null); // Ref for file input

  // Use the auth context
  const { register, isLoading, isAuthenticated, uploadProfilePicture } =
    useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/search"); // Or profile page?
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear specific error when user starts typing
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImageFile(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      // Clear any previous file-related errors if necessary
      if (errors.profileImage) {
        const newErrors = { ...errors };
        delete newErrors.profileImage;
        setErrors(newErrors);
      }
    } else {
      // Handle invalid file type or no file selected
      setProfileImageFile(null);
      setImagePreview(null);
      // Optionally set an error message
      setErrors((prev) => ({
        ...prev,
        profileImage: "Please select a valid image file (jpg, png, etc.).",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = { ...errors }; // Keep existing errors (like file errors)
    let isValid = true;

    // Basic validation rules (can be expanded)
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }
    if (!formData.age) {
      newErrors.age = "Age is required";
      isValid = false;
    } else if (isNaN(formData.age) || parseInt(formData.age, 10) < 18) {
      newErrors.age = "Age must be a number and at least 18";
      isValid = false;
    }

    // Note: We are not making the image *required* for signup here, but you could add:
    // if (!profileImageFile) { newErrors.profileImage = 'Profile image is required'; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const { confirmPassword: _confirmPassword, ...userData } = formData;

    try {
      // Step 1: Register the user with text data
      const registrationResult = await register(userData);

      if (registrationResult.success) {
        let finalMessage = "Registration successful!";
        let finalMessageType = "success";

        // Step 2: If registration succeeded AND an image was selected, upload it
        if (profileImageFile) {
          console.log("Uploading profile picture...");
          setToast({
            message: "Registration successful! Uploading picture...",
            type: "info",
          }); // Show info during upload
          const uploadResult = await uploadProfilePicture(profileImageFile);

          if (uploadResult.success) {
            finalMessage = "Registration and picture upload successful!";
            finalMessageType = "success";
          } else {
            finalMessage = `Registration succeeded, but picture upload failed: ${uploadResult.message}. You can upload later from profile.`;
            finalMessageType = "error";
          }
        }

        // Show final toast message
        setToast({ message: finalMessage, type: finalMessageType });

        // Step 3: Navigate immediately AFTER registration and potential upload attempt
        console.log("Navigating immediately to /search...");
        navigate("/search");
      } else {
        // Registration failed
        setToast({
          message: registrationResult.message || "Registration failed",
          type: "error",
        });
        if (registrationResult.errors) {
          const backendErrors = registrationResult.errors.reduce((acc, err) => {
            if (err.param) acc[err.param] = err.msg;
            return acc;
          }, {});
          setErrors((prev) => ({ ...prev, ...backendErrors }));
        }
      }
    } catch (error) {
      console.error("Signup handleSubmit error:", error);
      setToast({
        message:
          "An unexpected error occurred during signup. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff8f8] to-white flex flex-col justify-center py-2 sm:px-6 lg:px-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        {" "}
        {/* Increased max-width */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join Shree Laxmi Narayan Vivah Kendra today!
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-16 bg-gradient-to-r from-[#d42a3c] to-[#ff6b6b] rounded-full"></div>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        {" "}
        {/* Increased max-width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white py-8 px-6 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-4">
              {" "}
              {/* Reduced space-y */}
              {/* Profile Image Upload Section */}
              <div className="flex flex-col items-center space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture (Optional)
                </label>
                <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    // Placeholder Icon
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  )}
                </div>
                <button
                  type="button" // Important: type="button" to prevent form submission
                  onClick={() => fileInputRef.current?.click()} // Safely access click
                  className="px-4 py-1.5 text-sm border border-[#d42a3c] text-[#d42a3c] rounded-md hover:bg-[#fdf2f4] transition-colors"
                >
                  {imagePreview ? "Change Picture" : "Select Picture"}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden" // Hide the default file input
                  accept="image/png, image/jpeg, image/jpg" // Accept common image types
                  disabled={isLoading}
                />
                {errors.profileImage && (
                  <p className="mt-1 text-xs text-red-500 text-center">
                    {errors.profileImage}
                  </p>
                )}
              </div>
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:ring-[#d42a3c] focus:border-[#d42a3c] ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:ring-[#d42a3c] focus:border-[#d42a3c] ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:ring-[#d42a3c] focus:border-[#d42a3c] ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>
              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:ring-[#d42a3c] focus:border-[#d42a3c] ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              {/* Gender & Age (Inline) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:ring-[#d42a3c] focus:border-[#d42a3c] ${
                      errors.gender ? "border-red-500" : "border-gray-300"
                    }`}
                    disabled={isLoading}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-xs text-red-500">{errors.gender}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="18"
                    value={formData.age}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:ring-[#d42a3c] focus:border-[#d42a3c] ${
                      errors.age ? "border-red-500" : "border-gray-300"
                    }`}
                    disabled={isLoading}
                  />
                  {errors.age && (
                    <p className="mt-1 text-xs text-red-500">{errors.age}</p>
                  )}
                </div>
              </div>
              {/* Optional Fields: Location & Religion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location (Optional)
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-[#d42a3c] focus:border-[#d42a3c]"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label
                    htmlFor="religion"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Religion (Optional)
                  </label>
                  <input
                    id="religion"
                    name="religion"
                    type="text"
                    value={formData.religion}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-[#d42a3c] focus:border-[#d42a3c]"
                    disabled={isLoading}
                  />
                </div>
              </div>
              {/* Submit Button */}
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
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Link to Login */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#d42a3c] hover:text-[#b21e2f]"
              >
                Sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
