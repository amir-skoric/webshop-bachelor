//imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Webshops.css";
import axios from "axios";
import Spinner from "../Spinner/SpinnerWebshopOverview";


import { Link } from "react-router-dom";

//webshop add
import AddWebshop from "../WebshopAdd/WebshopAdd";

const Webshops = () => {
  //set up useNavigate
  const navigate = useNavigate()

  //states
  const [webshops, setWebshops] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  //get the current users webshops from the database
  async function getWebshops() {
    const url = import.meta.env.VITE_API_URL;
    try {
      await axios.get(`${url}getWebshops`).then((res) => {
        if (res.status === 200) {
          setWebshops(res.data);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  //function used to show the addWebshop component
  function addWebshopPopup() {
    setShowPopup(true);
  }

  //delete webshop function
  async function deleteWebshop(id, name, createdById) {
    const url = import.meta.env.VITE_API_URL;
    if (
      window.confirm(
        `Are you sure you want to delete ${name}? This will also delete all products assosiated with your store`
      )
    )
      //delete image from cloudinary using api (does not work)
      try {
        await axios
          .delete(`${url}deleteWebshop`, {
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
        {showPopup && <AddWebshop showPopup={setShowPopup} />}
      </div>
      <div className="webshopTableInfo">
        <p>Name</p>
        <p>Description</p>
        <p>Color</p>
        <p>Products</p>
        <p>Date</p>
      </div>
      {!loading ? (
        webshops.map((webshopData) => {
          return (
            <div className="webshopsContainer" key={webshopData._id}>
              <div className="webshops">
                <Link className="webshopInfo" to={`/webshops/${webshopData.name}`}>
                  <p>{webshopData.name}</p>
                  <p>{webshopData.description.substring(0, 15) + "..."}</p>
                  <p style={{ color: webshopData.color }}>■</p>
                  <p>{webshopData.products.length}</p>
                  <p>{webshopData.createdAt.substring(0, 10)}</p>
                </Link>
              </div>
              <div className="webshopsEdit">
                <button
                  onClick={() => navigate(`/webshops/${webshopData.name}/edit`, {state: {webshopData}})}
                >
                  Edit
                </button>
              </div>
              <div className="webshopsDelete">
                <button
                  onClick={() =>
                    deleteWebshop(
                      item._id,
                      item.name,
                      item.createdById,
                      item.bannerImageId
                    )
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

export default Webshops;
