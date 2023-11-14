import React from "react";
import "./Dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Dashboard = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  async function signout() {
    try {
      await axios
        .get("http://localhost:4000/signout", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Logged out");
            navigate("/login");
            window.location.reload();
          } else {
            alert("An error occurred trying to log out");
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <h1>Hello and welcome to the worlds best webshop builder!</h1>
      <h3>Your E-mail</h3>
      <p>{authUser.user.email}</p>
      <h3>Your ID</h3>
      <p>{authUser.user.id}</p>
      <button onClick={signout}>Sign out</button>
    </div>
  );
};

export default Dashboard;
