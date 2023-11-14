//imports
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true)

  async function authCheck() {
    try {
      await axios.get("http://localhost:4000/authCheck").then((res) => {
        if (res.status === 200) {
          setAuthUser(res.data.session.user);
          setAuthenticated(res.data.session.isAuthenticated);
        } else {
          setAuthenticated(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    authCheck();
    setLoading(false)
  }, [authenticated]);

  const value = {
    authUser,
    setAuthUser,
    authenticated,
    setAuthenticated,
    loading,
    setLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
