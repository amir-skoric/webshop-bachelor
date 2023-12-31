//imports
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Error from "../../../components/Error/Error";
import { useForm } from "react-hook-form";

import "../../Auth/auth.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setAuthenticated, setAuthUser, error, setError } = useAuth();

  const onSubmit = async (data) => {
    const url = import.meta.env.VITE_API_URL;
    try {
      await axios
        .post(`${url}login`, data, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            setAuthUser(res.data.user);
            setAuthenticated(res.data.authenticated);
          }
        });
    } catch (error) {
      setError(error.response?.data.error);
    }
  };

  return (
    <div className="login">
      <div className="container-login-register">
        <h1 className="h1-login-register">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form-login-register">
          <label className="label-form">E-mail</label>
          <input
            {...register("email", { required: "Please enter your e-mail" })}
            placeholder="E-mail"
            type="email"
          />
          <p className="form-error">{errors.email?.message}</p>
          <label className="label-form">Password</label>
          <input
            {...register("password", {
              required: "Please enter your password",
            })}
            placeholder="Password"
            type="password"
          />
          <p className="form-error">{errors.password?.message}</p>
          {error.length > 0 && <Error>{error}</Error>}
          <input type="submit" value="Login" />
        </form>
        <div className="container-click-here">
          <p>Don't have an account? Click</p>
          <Link to="/register">here!</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
