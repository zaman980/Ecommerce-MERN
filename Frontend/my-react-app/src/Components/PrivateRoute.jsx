import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Set to null initially to indicate loading

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    console.log("Stored User Info:", storedUserInfo); // Log the stored user info for debugging
    if (storedUserInfo) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, []);

  // Show loading or null while checking authentication
  if (isAuthenticated === null) return null; // or return a loading spinner

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
