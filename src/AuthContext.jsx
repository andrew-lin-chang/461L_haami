import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token, userid) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userid", userid);
    setUser({ userid, token });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userid");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
