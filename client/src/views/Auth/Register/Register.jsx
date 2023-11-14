//imports
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:4000/register", {
          email,
          password,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Account succesfully created. Login with your details");
            navigate("/login");
          }
        });
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <div className="Register">
      <div className="container-login-register">
        <h1 className="h1-login-register">Register</h1>
        <form action="POST" className="form-login-register">
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="E-mail"
            name="email"
            id="email"
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            name="password"
            id="password"
          />

          <input type="submit" onClick={submit} />
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
