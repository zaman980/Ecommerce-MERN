import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for token
    const storedToken = localStorage.getItem("token");
    
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true); // Update authentication status
    }
  }, []);

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // Clear localStorage token
  };

  return (
    <>
      <ToastContainer />
      <Navigation isAuthenticated={isAuthenticated} onLogout={logout} />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
};

export default App;
