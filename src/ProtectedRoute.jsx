import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // check if authToken exists to automatically login user
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userid = localStorage.getItem("userid");

    if (token && userid) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (!isLoggedIn && !loading) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
