// src/App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Search from "./pages/Search";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Helper component to check regular user auth for certain routes
const UserProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner
  }
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

// Main App Component
function App() {
  // Removed API test useEffect as it's likely not needed ongoing
  // useEffect(() => {
  //   const testApi = async () => {
  //     console.log("Testing API connection...");
  //     const results = await runApiTests();
  //     console.log("API test results:", results);
  //   };
  //   testApi();
  // }, []);

  return (
    <AuthProvider>
      <Router>
        {/* Render Navbar/Footer conditionally or based on route? Decide later if needed */}
        {/* For now, always render */}
        <Navbar />
        <div className="min-h-screen flex flex-col pt-20">
          {" "}
          {/* Added pt-20 for fixed navbar */}
          <div className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* User Protected Routes */}
              <Route element={<UserProtectedRoute />}>
                <Route path="/search" element={<Search />} />
                <Route path="/profile" element={<UserProfile />} />
                {/* Add other user-only routes here */}
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<AdminProtectedRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {/* Add other admin-only routes here */}
              </Route>

              {/* Catch-all or Not Found Route (Optional) */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
