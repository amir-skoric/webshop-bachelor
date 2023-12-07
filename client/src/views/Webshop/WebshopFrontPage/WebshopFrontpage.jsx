//imports
import React, { useEffect, useState } from "react";
import "./WebshopFrontpage.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
import Spinner from "../../../components/Spinner/SpinnerWebshop";

import { Link } from "react-router-dom";

const WebshopFrontpage = () => {
  const { webshop } = useParams();
  const { authUser } = useAuth();

  const [webshopData, setWebshopData] = useState({});
  const [loading, setLoading] = useState(true);

  //get the current webshop from the url parameter
  async function getWebshop() {
    try {
      await axios
        .get("http://localhost:4000/getWebshop" + webshop)
        .then((res) => {
          if (res.status === 200) {
            setWebshopData(res.data);
            setLoading(false);
          } else
            return (
              <h1>
                An error occurred while loading the webshop. Please try again
                later.
              </h1>
            );
        });
    } catch (error) {
      alert(error);
    }
  }

  //check if user that is logged in is logged in, and is the admin of the webshop
  function adminCheck() {
    if (!loading && authUser) {
      if (authUser.email === webshopData.createdBy) {
        return (
          <div className="webshopEditBanner">
            <Link to="/dashboard">Back to dashboard</Link>
            <p>
              Welcome, {authUser.fName} {authUser.lName}!
            </p>
            <Link to="edit" state={{ webshopData }}>
              Edit webshop
            </Link>
          </div>
        );
      }
    }
  }

  useEffect(() => {
    getWebshop();
    adminCheck();
  }, []);

  return (
    <div className="webshopFrontpage">
      {adminCheck()}
      {loading && <Spinner />}
      <div
        className="webshopBannerImage"
        style={{ backgroundImage: `url(${webshopData.bannerImage})`}}
      >
        <div className="webshopBannerContainer">
          <h1 style={{color: webshopData.color}}>{webshopData.name}</h1>
          <p>{webshopData.description}</p>
        </div>
      </div>
      <h2>Products</h2>
    </div>
  );
};

export default WebshopFrontpage;
