//imports
import React, { useEffect, useState } from "react";
import "./WebshopFrontpage.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
import SpinnerWebshop from "../../../components/Spinner/SpinnerWebshop";
import SpinnerProducts from "../../../components/Spinner/SpinnerWebshopOverview";

import { Link } from "react-router-dom";

const WebshopFrontpage = () => {
  const { webshop } = useParams();
  const { authUser } = useAuth();

  const [products, setProducts] = useState({});
  const [webshopData, setWebshopData] = useState({});
  const [loading, setLoading] = useState(true);

  //get the current webshop from the url parameter
  const getWebshop = async () => {
    try {
      let res = await axios.get("http://localhost:4000/getWebshop" + webshop);
      setWebshopData(res.data);
      setLoading(false);
    } catch (error) {
      alert(error);
      return (
        <h1>
          An error occurred while loading the webshop. Please try again later.
        </h1>
      );
    }
  };

  //get the current webshop's products from the database
  const getProducts = async () => {
    let params = { webshop: webshopData._id };
    try {
      let res = await axios.get("http://localhost:4000/getProducts", {
        params,
      });
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

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
            <Link to="edit" state={{ webshopData, products }}>
              Edit webshop
            </Link>
          </div>
        );
      }
    }
  }

  useEffect(() => {
    adminCheck();
    getWebshop();
  }, []);

  useEffect(() => {
    getProducts();
  }, [webshopData]);

  return (
    <div className="webshopFrontpage">
      {adminCheck()}
      {loading && <SpinnerWebshop />}
      <div
        className="webshopBannerImage"
        style={{ backgroundImage: `url(${webshopData.bannerImage})` }}
      >
        <div className="webshopBannerContainer">
          <h1 style={{ color: webshopData.color }}>{webshopData.name}</h1>
          <p>{webshopData.description}</p>
        </div>
      </div>

      <div className="productsWebshop">
        <h2 style={{ marginBottom: 40, color: webshopData.color }}>Products</h2>
        <div className="productsOverviewContainer">
          {!loading ? (
            products.map((item) => {
              return (
                <div className="productOverview" key={item._id}>
                  <img src={item.image}></img>
                  <h3>{item.name}</h3>
                  <p>{item.description.substring(0, 20) + "..."}</p>
                  <h2 style={{ color: webshopData.color, marginTop: 10, marginBottom: 10 }}>${item.price}.00</h2>
                  <button className="webshopAddToCartButton" style={{background: webshopData.color}}>Add to Cart</button>
                </div>
              );
            })
          ) : (
            <SpinnerProducts />
          )}
        </div>
        {products.length === 0 && (
          <p>No products for sale.</p>
        )}
      </div>
      <p style={{textAlign: "center", marginBottom: 50}}>
        If you have any questions related to our webshop, feel free to contact
        us at: <strong>{webshopData.createdByEmail}</strong>
      </p>
    </div>
  );
};

export default WebshopFrontpage;
