import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [expiresAt, setExpiresAt] = useState(localStorage.getItem("expiresAt"));

  const login = (token, expiresIn = 60000) => {
    setAuthToken(token);
    const expires = new Date().getTime() + expiresIn;
    setExpiresAt(expires);
    localStorage.setItem("authToken", token);
    localStorage.setItem("expiresAt", expires);
  };


  const logout = () => {
    setAuthToken(null);
    setExpiresAt(null);
    localStorage.clear();
  };

  const refreshAuthToken = async () => {
    try {
      const response = await fetch(
        "http://138.197.24.120:3000/api/auth/refresh-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ token: authToken }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        login(data.token);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Failed to refresh token", error);
      logout();
    }
  };

  useEffect(() => {
    if (authToken && expiresAt) {
      const timeout = expiresAt - new Date().getTime();
      const timer = setTimeout(() => {
        alert("Session is about to expire. Click OK to extend.");
        refreshAuthToken();
      }, timeout - 20000); // Alert 20 seconds before expiration

      return () => clearTimeout(timer);
    }
  }, [authToken, expiresAt]);

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
