//imports
import React, { useEffect, useState } from "react";
import "./WebshopFrontpage.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import SpinnerWebshop from "../../../components/Spinner/SpinnerWebshop";

//get webshop from api utility
import getWebshop from "../../../api/Webshop/getWebshop";

//products import
import Products from "../../../components/Product/Products/Products";

import { Link } from "react-router-dom";

const WebshopFrontpage = () => {
  const { webshop } = useParams();
  const { authUser } = useAuth();

  const [webshopData, setWebshopData] = useState({});
  const [loading, setLoading] = useState(true);

  //check if user that is logged in is logged in, and is the admin of the webshop
  function adminCheck() {
    if (!loading && authUser) {
      if (authUser.id === webshopData.createdById) {
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
    adminCheck();
  }, []);

  useEffect(() => {
    getWebshop(webshop).then((data) => {
      setWebshopData(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="webshopFrontpage">
      {adminCheck()}
      {loading && <SpinnerWebshop />}
      <div
        className="webshopBannerImage"
        style={{ backgroundImage: `url(${webshopData.bannerImage})` }}
      >
        <div className="webshopBannerContainer">
          <h1 style={{ color: webshopData.color }}>
            {webshopData.message || webshopData.name}
          </h1>
          <p>{webshopData.shortDescription}</p>
        </div>
      </div>
      <p className="webshopDescription">{webshopData.description}</p>
      <Products webshopData={webshopData} />
      <p style={{ textAlign: "center", marginBottom: 50 }}>
        If you have any questions related to our webshop, feel free to contact
        us at: <strong>{webshopData.createdByEmail}</strong>
      </p>
    </div>
  );
};

export default WebshopFrontpage;
