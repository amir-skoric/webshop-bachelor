//imports
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function setAuth() {
    const url = import.meta.env.VITE_API_URL;
    try {
      await axios.get(`${url}setAuth`).then((res) => {
        if (res.status === 200) {
          setAuthUser(res.data.session.user);
          setAuthenticated(res.data.session.isAuthenticated);
        } else {
          setAuthenticated(false);
          setError(res.data.error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setAuth();
    setLoading(false);
  }, []);

  const value = {
    authUser,
    setAuthUser,
    authenticated,
    setAuthenticated,
    loading,
    setLoading,
    error,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
