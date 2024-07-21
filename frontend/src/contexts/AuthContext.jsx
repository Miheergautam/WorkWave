import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log("AuthContext.jsx");
  const [auth, setAuth] = useState(localStorage.getItem("token"));
  console.log("AuthContext.jsx auth:", auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(token);
    }
    console.log(" inside use effect AuthContext.jsx token:", token);
  }, []);

  const login = (userData) => {
    setAuth(userData);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
  };

  const contextValue = React.useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useUser = () => {
  return useContext(AuthContext);
};
