import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setUser } = useAuth();

  // check if authToken exists to automatically login user
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userid = localStorage.getItem("userid");

    if (token && userid) {
      setUser({ userid, token });
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
