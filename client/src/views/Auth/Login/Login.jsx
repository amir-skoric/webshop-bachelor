//imports
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Error from "../../../components/Error/Error";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthenticated, setAuthUser, error, setError } = useAuth();

  async function submit(e) {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/login",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setAuthUser(res.data.user);
            setAuthenticated(res.data.authenticated);
          }
        });
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  return (
    <div className="login">
      <div className="container-login-register">
        <h1 className="h1-login-register">Login</h1>
        <form action="POST" className="form-login-register">
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="E-mail"
            name="email"
            id="email"
            required
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            name="password"
            id="password"
            required
          />
          {error.length > 0 && <Error>{error}</Error>}
          <input type="submit" onClick={submit} />
        </form>
        <div className="container-click-here">
          <p>Don't have an account yet? Click</p>
          <Link to="/register">here!</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
