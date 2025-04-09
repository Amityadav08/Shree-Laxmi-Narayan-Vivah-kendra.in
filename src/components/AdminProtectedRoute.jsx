import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const isAdminAuthenticated =
    localStorage.getItem("isAdminAuthenticated") === "true";

  console.log(
    "AdminProtectedRoute Check: isAdminAuthenticated =",
    isAdminAuthenticated
  );

  if (!isAdminAuthenticated) {
    // Redirect them to the /admin/login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />; // Render the nested route (AdminDashboard)
};

export default AdminProtectedRoute;
