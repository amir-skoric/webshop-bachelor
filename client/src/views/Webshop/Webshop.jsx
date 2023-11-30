//imports
import React, { useEffect, useState } from "react";
import "./Webshop.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Webshop = () => {
  const { webshop } = useParams();

  const [webshopData, setWebshopData] = useState({});
  const [loading, setLoading] = useState(true);

  //get the current webshop from the url parameter
  async function getWebshop() {
    try {
      await axios
        .get("http://localhost:4000/getWebshop"+webshop)
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
    <div>
      <h1>{webshopData.name}</h1>
      <p>{webshopData.description}</p>
      <p>{webshopData.createdBy}</p>
    </div>
  );
};

export default Webshop;
