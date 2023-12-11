//imports
import React from "react";
import "./Dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

//logo
import Logo from "../../assets/logo.svg";

import Webshops from "../../components/Webshops/Webshops";

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
            alert(res.data.message);
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

  async function deleteUser() {
    if (
      window.confirm(
        `Are you sure you want to delete your user? This will will delete all webshops and products you've made.`
      )
    )
      try {
        await axios
          .delete("http://localhost:4000/deleteUser", {
            data: { createdById: authUser.id },
          })
          .then((res) => {
            if (res.status === 200) {
              alert(res.data.message);
              signout();
            }
          });
      } catch (error) {
        alert(error.response.data.error);
      }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-banner">
        <img src={Logo} style={{height: 100}} />
        <h1>
          Hello, {authUser.fName} {authUser.lName}
        </h1>
        <h3>Your E-mail</h3>
        <p>{authUser.email}</p>
        <button className="dashboard-button" onClick={signout}>
          Sign Out
        </button>
        <button className="dashboard-button-delete" onClick={deleteUser}>
          Delete User
        </button>
      </div>
      <Webshops />
    </div>
  );
};

export default Dashboard;
