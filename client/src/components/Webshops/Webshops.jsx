//imports
import React, { useEffect, useState } from "react";
import "./Webshops.css";
import axios from "axios";
import Spinner from "../Spinner/SpinnerWebshopOverview";

import { Link } from "react-router-dom";

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
      console.log(error)
    }
  }

  function addWebshopPopup() {
    setShowpopup(true);
  }

  async function deleteWebshop(id, name, createdById) {
    if (
      window.confirm(
        `Are you sure you want to delete ${name}? This will also delete all products assosiated with your store`
      )
    )
      try {
        await axios
          .delete("http://localhost:4000/deleteWebshop", {
            data: { webshopId: id, createdById: createdById },
          })
          .then((res) => {
            if (res.status === 200) {
              alert(res.data);
              setLoading(true);
              getWebshops();
            }
          });
      } catch (error) {
        alert(error.response.data.error);
      }
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
        {showPopup && <AddWebshop showPopup={setShowpopup} />}
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
            <div className="webshopsContainer" key={item._id}>
              <div className="webshops">
                <Link className="webshopInfo" to={`/webshops/${item.name}`}>
                  <p>{item.name}</p>
                  <p>{item.description.substring(0, 15) + "..."}</p>
                  <p style={{ color: item.color }}>■</p>
                  <p>{item.products.length}</p>
                  <p>{item.createdAt.substring(0, 10)}</p>
                </Link>
              </div>
              <div className="webshopsDelete">
                <button
                  onClick={() =>
                    deleteWebshop(item._id, item.name, item.createdById)
                  }
                >
                  Delete
                </button>
              </div>
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
