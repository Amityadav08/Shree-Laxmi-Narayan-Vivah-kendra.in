import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth, API_URL } from "../context/AuthContext";
import axios from "axios";

// Define backend base URL for images (if not using full URLs from backend)
const BACKEND_URL = API_URL.replace("/api", "");

// Simple toast implementation
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

// --- Create stable Axios instance outside component ---
const api = axios.create({ baseURL: API_URL });
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// ----------------------------------------------------

// --- UI Components ---

const UserCard = ({ user }) => {
  const imageUrl = user.profilePicture
    ? `${BACKEND_URL}${user.profilePicture}`
    : null;
  // Placeholder image if no profile picture
  const placeholderImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.name
  )}&background=random&color=fff&size=128`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="h-40 bg-gradient-to-r from-red-100 to-rose-100 relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={placeholderImage}
            alt={user.name}
            className="w-full h-full object-cover opacity-50"
          />
        )}
        {/* You could add an online status indicator here if available */}
      </div>
      <div className="p-4 relative pt-12 text-center">
        {/* Centered Avatar overlapping the banner */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-10">
          <div className="h-20 w-20 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
            <img
              src={imageUrl || placeholderImage}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-2 truncate">
          {user.name}
        </h3>
        <p className="text-sm text-gray-500">{user.age} years</p>
        <div className="mt-2 text-xs text-gray-600 space-y-1">
          {user.occupation && (
            <p>
              <span className="font-medium">Occupation:</span> {user.occupation}
            </p>
          )}
          {user.location && (
            <p>
              <span className="font-medium">Location:</span> {user.location}
            </p>
          )}
          {user.religion && (
            <p>
              <span className="font-medium">Religion:</span> {user.religion}
            </p>
          )}
        </div>
        {/* Add a button/link to view full profile */}
        <button className="mt-4 w-full bg-[#d42a3c] hover:bg-[#b21e2f] text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-150">
          View Profile
        </button>
      </div>
    </motion.div>
  );
};

const Filters = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  const handleAgeChange = (e) => {
    const { name, value } = e.target;
    const ageValue = value === "" ? "" : parseInt(value, 10);
    if (isNaN(ageValue) && value !== "") return; // Prevent non-numeric input unless clearing
    onFilterChange({ ...filters, [name]: ageValue });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 sticky top-24 z-10">
      {" "}
      {/* Sticky filters */}
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        Filter Profiles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gender */}
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={filters.gender || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#d42a3c] focus:border-[#d42a3c] text-sm"
          >
            <option value="">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option> {/* If applicable */}
          </select>
        </div>

        {/* Age Range */}
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <label
              htmlFor="minAge"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Min Age
            </label>
            <input
              type="number"
              id="minAge"
              name="minAge"
              min="18"
              value={filters.minAge || ""}
              onChange={handleAgeChange}
              placeholder="18"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#d42a3c] focus:border-[#d42a3c] text-sm"
            />
          </div>
          <span className="text-gray-500 pb-2">-</span>
          <div className="flex-1">
            <label
              htmlFor="maxAge"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Max Age
            </label>
            <input
              type="number"
              id="maxAge"
              name="maxAge"
              min="18"
              value={filters.maxAge || ""}
              onChange={handleAgeChange}
              placeholder="99"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#d42a3c] focus:border-[#d42a3c] text-sm"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location || ""}
            onChange={handleInputChange}
            placeholder="e.g., City, State"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#d42a3c] focus:border-[#d42a3c] text-sm"
          />
        </div>

        {/* Religion */}
        <div>
          <label
            htmlFor="religion"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Religion
          </label>
          <input
            type="text"
            id="religion"
            name="religion"
            value={filters.religion || ""}
            onChange={handleInputChange}
            placeholder="e.g., Hinduism, Christianity"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#d42a3c] focus:border-[#d42a3c] text-sm"
          />
        </div>
      </div>
      {/* Add a button to apply filters or trigger search immediately on change */}
      {/* <button className="mt-4 bg-[#d42a3c] text-white px-4 py-2 rounded">Apply</button> */}
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Basic pagination - can be enhanced with page numbers
  return (
    <div className="mt-8 flex justify-center items-center space-x-4">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

// --- Main Search Page Component ---

const Search = () => {
  // Get auth state and navigation
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();

  // Component state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Separate loading state for search results
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
  });
  const [toast, setToast] = useState(null); // Keep toast if needed for other actions

  // Effect for authentication check and redirection
  useEffect(() => {
    // Wait until the initial authentication check is complete
    if (!isAuthLoading && !isAuthenticated()) {
      console.log(
        "Search Page: User not authenticated. Redirecting to /login..."
      );
      navigate("/login");
    }
  }, [isAuthenticated, isAuthLoading, navigate]);

  // Function to fetch users - uses stable 'api' instance from module scope
  const fetchUsers = useCallback(
    async (currentFilters, currentPage) => {
      if (!isAuthenticated()) {
        console.log("Search Page: Skipping fetch, user not authenticated.");
        setLoading(false);
        return; // Don't fetch if not authenticated
      }
      console.log(
        `Search Page: Fetching users - Page: ${currentPage}, Filters:`,
        currentFilters
      );
      setLoading(true);
      setError(null);
      try {
        const params = {
          ...currentFilters,
          page: currentPage,
          limit: pagination.limit,
        };
        Object.keys(params).forEach((key) => {
          if (
            params[key] === "" ||
            params[key] === null ||
            params[key] === undefined
          ) {
            delete params[key];
          }
        });

        const response = await api.get("/profiles/search", { params });

        if (response.data && response.data.success) {
          setUsers(response.data.results || []);
          setPagination({
            page: response.data.page || 1,
            limit: response.data.limit || 12,
            total: response.data.total || 0,
            totalPages: response.data.totalPages || 1,
          });
        } else {
          throw new Error(response.data?.message || "Failed to fetch users");
        }
      } catch (err) {
        // Check if the error is specifically an authentication error
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          console.error("Search Page: Authentication error during fetch.");
          // Redirect might have already been triggered by the other useEffect
          // setError("Authentication failed. Redirecting..."); // Optional: set specific error
        } else {
          console.error("Search Page: Error fetching users:", err);
          setError(
            err.response?.data?.message ||
              err.message ||
              "An error occurred while fetching profiles."
          );
        }
        setUsers([]);
      } finally {
        setLoading(false);
      }
      // Removed 'api' dependency as it's stable now
    },
    [isAuthenticated, pagination.limit]
  );

  // Effect to fetch data when filters or page change, only if authenticated
  useEffect(() => {
    // Only run fetch if authentication is resolved and successful
    if (!isAuthLoading && isAuthenticated()) {
      fetchUsers(filters, pagination.page);
      window.scrollTo(0, 0);
    }
    // If auth check finishes and user is NOT authenticated, the redirect effect handles it.
    // If auth check is still loading, we wait.
  }, [isAuthenticated, isAuthLoading, filters, pagination.page, fetchUsers]);

  const handleFilterChange = (newFilters) => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    setFilters(newFilters);
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // Render loading state while initial auth check is happening
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d42a3c] ml-4"></div>
      </div>
    );
  }

  // If not authenticated after check, render null while redirect happens
  // (The redirect useEffect should handle navigation away quickly)
  if (!isAuthenticated()) {
    return null;
  }

  // --- Render actual search page content ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-rose-50 to-white px-4 sm:px-6 lg:px-8 py-8">
      {/* Display toast messages if needed */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center text-gray-800 mb-6"
        >
          Find Your Match
        </motion.h1>

        <Filters filters={filters} onFilterChange={handleFilterChange} />

        {/* Use the search results loading state */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#d42a3c]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">
            <p>{error}</p> {/* Display specific error */}
            <button
              onClick={() => fetchUsers(filters, pagination.page)}
              className="mt-2 text-sm text-[#d42a3c] underline"
            >
              Try again
            </button>
          </div>
        ) : users.length > 0 ? (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {users.map((u) => (
                <UserCard key={u._id} user={u} />
              ))}
            </motion.div>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center text-gray-500 bg-gray-100 p-6 rounded-lg">
            <p>No profiles found matching your criteria.</p>
            <p className="text-sm mt-2">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
