import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../context/AuthContext";

// --- Create stable Admin API instance outside component ---
// Note: This assumes NO specific admin token is needed due to insecure setup.
// In a real app, this instance would need an admin-specific token/interceptor.
const adminApi = axios.create({ baseURL: API_URL });
adminApi.interceptors.request.use(
  (config) => {
    // Add the demo admin header
    config.headers["X-Admin-Request"] = "true";

    // If an admin token mechanism existed, it would be added here.
    // const adminToken = localStorage.getItem('adminAuthToken');
    // if (adminToken) config.headers['Authorization'] = `Bearer ${adminToken}`;

    // Set Content-Type if not present (needed for JSON vs FormData)
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// --------------------------------------------------------

// --- Reusable Admin Components (Example) ---
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
    <div className="text-3xl text-[#d42a3c]">{icon}</div>
    <div>
      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
        {title}
      </p>
      <p className="text-2xl font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const RecentUserList = ({ users = [], onDeleteUser }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Recently Joined Users
    </h3>
    {users.length === 0 ? (
      <p className="text-gray-500 text-sm">No recent users found.</p>
    ) : (
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user._id} className="py-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">
                {user.email} - Joined:{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => onDeleteUser(user._id)}
              className="text-xs text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

// --- Add User Form Component ---
const AddUserForm = ({ onUserAdded }) => {
  const initialFormState = {
    name: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    location: "",
    religion: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError(null); // Clear error on change
    setFormSuccess(null); // Clear success on change
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormError(null); // Clear potential previous file errors
    } else {
      setProfileImageFile(null);
      setImagePreview(null);
      if (file) {
        // Only show error if a file was selected but invalid
        setFormError("Please select a valid image file (jpg, png).");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.gender ||
      !formData.age
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);
    let addedUser = null;
    let uploadSuccess = false;
    let uploadMessage = "";

    try {
      // Step 1: Add user text data using adminApi
      const addUserResponse = await adminApi.post("/admin/users", formData);
      if (addUserResponse.data && addUserResponse.status === 201) {
        addedUser = addUserResponse.data.user;
      } else {
        throw new Error(
          addUserResponse.data?.message || "Failed to add user text data"
        );
      }

      // Step 2: If user added AND image selected, upload image using adminApi
      if (addedUser && profileImageFile) {
        console.log(
          `Admin: Uploading picture for new user ${addedUser._id} using adminApi...`
        );
        const imageFormData = new FormData();
        imageFormData.append("profileImage", profileImageFile);
        imageFormData.append("userId", addedUser._id); // Send the target userId

        try {
          // Use adminApi directly, override Content-Type for FormData
          const uploadResponse = await adminApi.post(
            "/profiles/me/upload-picture", // Use the same profile route
            imageFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                // X-Admin-Request header is added by the interceptor
              },
            }
          );

          if (uploadResponse.data && uploadResponse.data.success) {
            console.log("Admin: Picture uploaded successfully via adminApi.");
            uploadSuccess = true;
            uploadMessage = "User and picture added successfully!";
          } else {
            uploadSuccess = false;
            uploadMessage = `User added, but picture upload failed: ${
              uploadResponse.data?.message || "Unknown upload error"
            }`;
          }
        } catch (uploadErr) {
          console.error(
            "Admin: Error during image upload via adminApi:",
            uploadErr
          );
          uploadSuccess = false;
          uploadMessage = `User added, but picture upload failed: ${
            uploadErr.response?.data?.message ||
            uploadErr.message ||
            "Upload network/server error"
          }`;
        }
      }

      // Set final status messages
      if (addedUser && !profileImageFile) {
        setFormSuccess("User added successfully!");
      } else if (addedUser && profileImageFile) {
        if (uploadSuccess) {
          setFormSuccess(uploadMessage);
        } else {
          setFormError(uploadMessage); // Show upload error
        }
      }

      // Clear form and notify parent IF user was added
      if (addedUser) {
        setFormData(initialFormState);
        setProfileImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = null; // Reset file input visually
        onUserAdded(addedUser);
      }
    } catch (err) {
      // Error during Step 1 (adding user text data)
      console.error("Admin: Error adding user text data:", err);
      setFormError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred adding user data."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <p className="text-sm text-red-600 bg-red-100 p-2 rounded">
          {formError}
        </p>
      )}
      {formSuccess && (
        <p className="text-sm text-green-600 bg-green-100 p-2 rounded">
          {formSuccess}
        </p>
      )}

      {/* Image Upload Input */}
      <div className="flex flex-col items-center space-y-2">
        <label className="label text-center">Profile Picture (Optional)</label>
        <div className="relative h-20 w-20 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <svg
              className="h-10 w-10 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          )}
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-xs border border-gray-400 px-2 py-1 rounded hover:bg-gray-100"
        >
          {imagePreview ? "Change" : "Select Image"}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>

      {/* Form Fields - Using labels and basic structure */}
      <div>
        <label htmlFor="name" className="label">
          Name *
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="email" className="label">
          Email *
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="password" className="label">
          Password *
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input-field"
          placeholder="Min 6 characters"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="gender" className="label">
            Gender *
          </label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="age" className="label">
            Age *
          </label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
            min="18"
            required
            className="input-field"
          />
        </div>
      </div>
      <div>
        <label htmlFor="location" className="label">
          Location
        </label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="religion" className="label">
          Religion
        </label>
        <input
          type="text"
          name="religion"
          id="religion"
          value={formData.religion}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? (
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
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
        ) : (
          "Add User"
        )}
      </button>
      {/* Simple CSS for input fields */}
      <style>{`.label { display: block; font-size: 0.875rem; font-medium; color: #4b5563; margin-bottom: 0.25rem; } .input-field { display: block; width: 100%; border: 1px solid #d1d5db; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); padding: 0.5rem 0.75rem; font-size: 0.875rem; } .input-field:focus { outline: none; ring-width: 2px; ring-offset-width: 0px; --tw-ring-color: #d42a3c; border-color: #d42a3c; } .submit-button { width: 100%; background-color: #1f2937; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; display: flex; justify-content: center; align-items: center; margin-top: 1rem; } .submit-button:hover { background-color: #374151; } .submit-button:disabled { opacity: 0.5; cursor: not-allowed; }`}</style>
    </form>
  );
};

// --- Main Admin Dashboard Component ---
const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, recentUsers: [] });
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorStats, setErrorStats] = useState(null);
  const [errorAction, setErrorAction] = useState(null); // For delete/add errors
  const navigate = useNavigate();

  // Fetch stats on component mount
  const fetchStats = useCallback(async () => {
    setLoadingStats(true);
    setErrorStats(null);
    try {
      console.log("Admin Dashboard: Fetching stats...");
      const response = await adminApi.get("/admin/stats");
      if (response.data) {
        console.log("Admin Dashboard: Stats received:", response.data);
        setStats(response.data);
      } else {
        throw new Error("Invalid stats response from server");
      }
    } catch (err) {
      console.error("Admin Dashboard: Error fetching stats:", err);
      setErrorStats(
        err.response?.data?.message ||
          err.message ||
          "Failed to load dashboard statistics."
      );
    } finally {
      setLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/admin/login");
  };

  // Placeholder Icons (Replace with actual icons if using an icon library)
  const UserIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 01-6-6h6a6 6 0 016 6z"
      />
    </svg>
  );

  // Callback when user is successfully added by the form
  const handleUserAdded = (newUser) => {
    console.log("Dashboard notified of new user:", newUser);
    fetchStats(); // Refresh stats
    setErrorAction(null);
  };

  // Callback to delete a user
  const handleDeleteUser = async (userId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }
    setErrorAction(null); // Clear previous action errors
    try {
      console.log(`Admin: Deleting user ${userId}...`);
      const response = await adminApi.delete(`/admin/users/${userId}`);
      if (response.data && response.status === 200) {
        console.log("Admin: User deleted successfully", response.data);
        fetchStats(); // Refresh stats after deletion
      } else {
        throw new Error(response.data?.message || "Failed to delete user");
      }
    } catch (err) {
      console.error("Admin: Error deleting user:", err);
      setErrorAction(
        err.response?.data?.message || err.message || "Could not delete user."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>
          {/* You might want to add the logo here too */}
          <img src="/logo.jpeg" alt="Logo" className="h-8 w-auto" />
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Global Action Error Display */}
        {errorAction && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            Action failed: {errorAction}
          </div>
        )}

        {/* Stats Section */}
        <section className="mb-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-3">
            Overview
          </h2>
          {loadingStats ? (
            <p className="text-gray-500">Loading statistics...</p>
          ) : errorStats ? (
            <p className="text-red-600">Error loading stats: {errorStats}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                icon={<UserIcon />}
              />
              {/* Add more StatCards here if needed */}
            </div>
          )}
        </section>

        {/* Recent Users & Add User Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Users List (takes 2 columns on large screens) */}
          <div className="lg:col-span-2">
            {loadingStats ? (
              <p className="text-gray-500">Loading recent users...</p>
            ) : errorStats ? (
              <p className="text-red-600">Error loading recent users.</p>
            ) : (
              <RecentUserList
                users={stats.recentUsers}
                onDeleteUser={handleDeleteUser}
              />
            )}
          </div>

          {/* Add User Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Add Offline User
            </h3>
            <AddUserForm onUserAdded={handleUserAdded} />
          </div>
        </section>

        {/* TODO: Add Full User Management Table Section (Fetch all users, search, delete) */}
      </main>
    </div>
  );
};

export default AdminDashboard;
