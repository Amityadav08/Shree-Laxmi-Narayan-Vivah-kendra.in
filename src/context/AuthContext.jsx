import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the auth context
const AuthContext = createContext();

// Export API_URL for use in components
export const API_URL = "http://localhost:5000/api"; // Ensure this matches your backend

// For debugging API calls
const DEBUG_API = true;

// Key for storing token in localStorage - DEFINED EARLY
const TOKEN_STORAGE_KEY = "authToken";

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  // Removed withCredentials, not typically needed with Bearer tokens
  // unless dealing with specific CORS cookie scenarios not apparent here.
  // withCredentials: true,
  headers: {
    // Default Content-Type removed here, will be set by interceptor
    // "Content-Type": "application/json",
  },
  timeout: 10000,
});

// --- Axios Request Interceptor ---
// Add a request interceptor to automatically add the token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY); // Now uses correctly defined constant
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Set default Content-Type if not already set (important for FormData vs JSON)
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// --------------------------------

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_STORAGE_KEY) // Uses correctly defined constant
  ); // Initialize token state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch user data when token changes or on initial load
  useEffect(() => {
    const fetchUserData = async () => {
      const currentToken = localStorage.getItem(TOKEN_STORAGE_KEY); // Uses correctly defined constant
      if (currentToken) {
        if (DEBUG_API)
          console.log("AuthContext: Token found, fetching user data...");
        setIsLoading(true);
        try {
          const response = await api.get("/profiles/me");
          if (response.data && response.data.success) {
            if (DEBUG_API)
              console.log(
                "AuthContext: User data fetched:",
                response.data.user
              );
            setUser(response.data.user);
          } else {
            if (DEBUG_API)
              console.warn(
                "AuthContext: Failed to fetch user data with token.",
                response.data
              );
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            setToken(null);
            setUser(null);
          }
        } catch (err) {
          console.error(
            "AuthContext: Error fetching user data:",
            err.response?.data || err.message
          );
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          setToken(null);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        if (DEBUG_API)
          console.log("AuthContext: No token found, user not logged in.");
        setUser(null);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  // Function to set token in state and localStorage
  const saveToken = (newToken) => {
    if (newToken) {
      localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    setToken(newToken);
  };

  // Register user
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      if (DEBUG_API) console.log("Registering user with data:", userData);
      const response = await api.post("/auth/register", userData);
      if (DEBUG_API) console.log("Registration response:", response.data);
      if (response.data && response.data.success && response.data.token) {
        saveToken(response.data.token);
        return { success: true, user: response.data.user };
      } else {
        const message = response.data?.message || "Registration failed";
        setError(message);
        return { success: false, message, errors: response.data?.errors };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Registration failed due to network or server error";
      const errors = err.response?.data?.errors;
      if (DEBUG_API)
        console.error("Registration error:", err.response?.data || err.message);
      setError(errorMessage);
      return { success: false, message: errorMessage, errors };
    } finally {
      setIsLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      if (DEBUG_API) console.log("Logging in with email:", email);
      const response = await api.post("/auth/login", { email, password });
      if (DEBUG_API) console.log("Login response:", response.data);
      if (response.data && response.data.success && response.data.token) {
        saveToken(response.data.token);
        return { success: true, user: response.data.user };
      } else {
        const message = response.data?.message || "Login failed";
        setError(message);
        return { success: false, message };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Login failed due to network or server error";
      if (DEBUG_API)
        console.error("Login error:", err.response?.data || err.message);
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    if (DEBUG_API) console.log("Logging out user");
    saveToken(null);
    setUser(null);
  };

  // --- Upload Profile Picture Function ---
  const uploadProfilePicture = async (file) => {
    if (!file) return { success: false, message: "No file provided." };
    const formData = new FormData();
    formData.append("profileImage", file);
    setIsLoading(true);
    setError(null);
    try {
      if (DEBUG_API) console.log("Uploading profile picture...");
      const response = await api.post("/profiles/me/upload-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (DEBUG_API) console.log("Upload response:", response.data);
      if (response.data && response.data.success) {
        updateUserData(response.data.user);
        return {
          success: true,
          user: response.data.user,
          filePath: response.data.filePath,
        };
      } else {
        const message = response.data?.message || "Upload failed";
        setError(message);
        return { success: false, message };
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Upload failed due to network or server error";
      if (DEBUG_API)
        console.error("Upload error:", err.response?.data || err.message);
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
  // ------------------------------------

  // Update user data (locally in state, e.g., after profile edit FORM submit)
  // This does NOT persist to backend, separate API call needed for that (e.g., in UserProfile.jsx)
  const updateUserData = (updatedFields) => {
    setUser((currentUser) => {
      if (!currentUser) return null;
      const updatedUser = { ...currentUser, ...updatedFields };
      if (DEBUG_API)
        console.log("AuthContext: Updating local user state:", updatedUser);
      return updatedUser;
    });
  };

  // Check if user is authenticated (user object exists)
  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        login,
        register,
        logout,
        updateUserData,
        isAuthenticated,
        uploadProfilePicture,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
