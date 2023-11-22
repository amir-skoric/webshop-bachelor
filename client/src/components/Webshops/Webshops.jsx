//imports
import React, { useEffect, useState } from "react";
import "./Webshops.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

//webshop add
import AddWebshop from "../WebshopAdd/WebshopAdd";

const WebshopTable = () => {
  const [webshops, setWebshops] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowpopup] = useState(false);

  //get the current users webshops from the database
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

  function addWebshopPopup() {
    setShowpopup(true);
  }

  useEffect(() => {
    getWebshops();
  }, []);

  return (
    <div className="webshopTable">
      <div className="webshopButtons">
        <button onClick={addWebshopPopup} className="webshopAddButton">
          Create a Webshop
        </button>
        {showPopup && <AddWebshop showPopup={setShowpopup}/>}
      </div>
      <div className="webshopTableInfo">
        <p>Name</p>
        <p>Description</p>
        <p>Color</p>
        <p>Products</p>
        <p>Date</p>
      </div>
      {!loading ? (
        webshops.map((item) => {
          return (
            <div className="webshopInfo" key={item._id}>
              <p>{item.name}</p>
              <p>{item.description.substring(0, 10)}</p>
              <p style={{ color: item.color }}>■</p>
              <p>{item.products.length}</p>
              <p>{item.createdAt.substring(0, 10)}</p>
            </div>
          );
        })
      ) : (
        <Spinner />
      )}
      {webshops.length === 0 && (
        <p>You have no webshops. Create one to get started.</p>
      )}
    </div>
  );
};

export default WebshopTable;
