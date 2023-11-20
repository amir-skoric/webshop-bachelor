//imports
import React, { useEffect, useState } from "react";
import "./Webshops.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

const WebshopTable = () => {
  const [webshops, setWebshops] = useState({});
  const [loading, setLoading] = useState(true);
  async function getWebshops() {
    try {
      await axios.get("http://localhost:4000/getWebshops").then((res) => {
        if (res.status === 200) {
          setWebshops(res.data);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWebshops();
  }, []);

  return (
    <div className="webshopTable">
      {!loading ? (
        webshops.map((item) => {
          return <p key={item._id}>{item.name}</p>;
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default WebshopTable;
