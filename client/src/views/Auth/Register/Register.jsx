//imports
import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import Error from "../../../components/Error/Error";

import "../../Auth/auth.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { error, setError } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios
        .post("http://localhost:4000/register", {
          data,
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Account successfully created. Login with your details");
            navigate("/login");
            window.location.reload();
          }
        });
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="register">
      <div className="container-login-register">
        <h1 className="h1-login-register">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form-login-register">
          <div className="first-last-name">
            <div className="first-name">
              <label className="label-form">First Name</label>
              <input
                {...register("fName", {
                  required: "Please enter your first name",
                })}
                placeholder="First Name"
                type="text"
              />
              <p className="form-error">{errors.fName?.message}</p>
            </div>
            <div className="last-name">
              <label className="label-form">Last Name</label>
              <input
                {...register("lName", {
                  required: "Please enter your last name",
                })}
                placeholder="Last Name"
                type="text"
              />
              <p className="form-error">{errors.lName?.message}</p>
            </div>
          </div>
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
              minLength: {
                value: 8,
                message: "Your password needs to be at least 8 characters long",
              },
            })}
            placeholder="Password"
            type="password"
          />
          <p className="form-error">{errors.password?.message}</p>
          <label className="label-form">Confirm Password</label>
          <input
            {...register("cfmPassword", {
              required: "Please confirm your password",
              validate: (val) => {
                const { password } = getValues();
                return password === val || "Your passwords do not match";
              },
            })}
            placeholder="Confirm password"
            type="password"
          />
          <p className="form-error">{errors.cfmPassword?.message}</p>
          {error.length > 0 && <Error>{error}</Error>}
          <input type="submit" value="Register" />
        </form>
        <div className="container-click-here">
          <p>Already have an account? Click</p>
          <Link to="/login">here!</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
