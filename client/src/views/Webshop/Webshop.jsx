//imports
import React, { useEffect, useState } from "react";
import "./Webshop.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner/SpinnerWebshop";

const Webshop = () => {
  const { webshop } = useParams();

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
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getWebshop();
  }, []);

  return (
    <div className="webshopFrontpage">
      {loading && <Spinner />}
      <div
        className="webshopBannerImage"
        style={{ backgroundImage: `url(${webshopData.bannerImage})` }}
      >
        <div className="webshopBannerContainer">
          <h1>{webshopData.name}</h1>
          <p>{webshopData.description}</p>
        </div>
      </div>
      <h1>Products</h1>
      <h1>test</h1>
      <h1>test</h1>
    </div>
  );
};

export default Webshop;
