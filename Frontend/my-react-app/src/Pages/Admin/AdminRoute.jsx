import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  // Retrieve userInfo from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(userInfo);

  // Check if the user exists and has admin privileges
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
