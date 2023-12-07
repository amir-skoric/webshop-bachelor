//imports
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./webshopEdit.css";
import { useForm } from "react-hook-form";
import Error from "../../../../components/Error/Error";

import Spinner from "../../../../components/Spinner/SpinnerWebshopOverview/";
import AddProduct from "../../../../components/Product/AddProduct/AddProduct";

const WebshopEdit = () => {
  //used to navigate back to previous page
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  //get state from webshop
  const location = useLocation();
  const webshop = location.state;

  //react hook form prerequisites
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: webshop.webshopData.name,
      description: webshop.webshopData.description,
      color: webshop.webshopData.color,
    },
  });

  function webshopCheck() {
    if (webshop === null) {
      return <h2>Unauthorized access</h2>;
    }
  }

  //get the current users webshops from the database
  async function getProducts() {
    try {
      await axios
        .get("http://localhost:4000/getProducts", {
          params: { webshop: webshop.webshopData._id },
        })
        .then((res) => {
          if (res.status === 200) {
            setProducts(res.data);
            setLoading(false);
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const onSubmit = async (data) => {
    //get webshop id for updating purposes
    data._id = webshop.webshopData._id;

    //if an image is selected then:
    //convert image to base64 and set it as a state to use later
    const reader = new FileReader();
    if (data.bannerImage[0] !== undefined) {
      reader.readAsDataURL(data.bannerImage[0]);
      reader.onload = async function () {
        try {
          await axios
            .post("http://localhost:4000/updateWebshop", {
              data: {
                _id: data._id,
                name: data.name,
                description: data.description,
                color: data.color,
                bannerImage: reader.result,
              },
              withCredentials: true,
            })
            .then((res) => {
              if (res.status === 200) {
                alert(res.data.message);
                navigate("/webshops/" + data.name, { replace: true });
              }
            });
        } catch (error) {
          setError(error.response.data.error);
        }
      };
    } else {
      //if no new image is selected, use the current one saved in the database
      try {
        await axios
          .post("http://localhost:4000/updateWebshop", {
            data: {
              _id: data._id,
              name: data.name,
              description: data.description,
              color: data.color,
              bannerImage: webshop.webshopData.bannerImage,
            },
            withCredentials: true,
          })
          .then((res) => {
            if (res.status === 200) {
              alert(res.data.message);
              navigate("/webshops/" + data.name, { replace: true });
            }
          });
      } catch (error) {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <div className="webshopEdit">
      <button className="webshopEditBackButton" onClick={() => navigate(-1)}>
        Go back
      </button>
      {webshopCheck()}
      {!webshopCheck() && (
        <div className="webshopEditInfo">
          <form onSubmit={handleSubmit(onSubmit)} className="form-webshopEdit">
            <h1 className="h1-webshopEdit">Edit Your Webshop</h1>
            <label className="label-form">Name</label>
            <input
              {...register("name", {
                required: "Please enter the desired name of your webshop",
              })}
              placeholder="Name"
              type="text"
            />
            <p className="form-error">{errors.name?.message}</p>
            <label className="label-form">Description</label>
            <textarea
              {...register("description", {
                required: "Describe your webshop with a few words",
              })}
              placeholder="Description"
              type="text"
              rows="4"
              cols="30"
            />
            <p className="form-error">{errors.description?.message}</p>
            <label className="label-form">Primary color</label>
            <input
              {...register("color", {
                required:
                  "Please enter input the primary color of your webshop",
              })}
              placeholder="color"
              type="color"
            />
            <p className="form-error">{errors.color?.message}</p>
            <label className="label-form">Current Banner Image</label>
            <img src={webshop.webshopData.bannerImage}></img>
            <input
              {...register("bannerImage", {})}
              placeholder="Upload an image"
              type="file"
              accept=".png, .jpg, .jpeg"
            />
            {error.length > 0 && <Error>{error}</Error>}
            <input type="submit" value="Save changes" />
          </form>
        </div>
      )}
      <div className="webshopEditProducts">
        <h1>My products</h1>
      </div>
      {!loading ? (
        products.map((item) => {
          return (
            <div className="productsContainerEditPage" key={item._id}>
              <div className="productsEditOverview">
                <p>{item.name}</p>
                <img src={item.image}></img>
                <p>{item.description.substring(0, 5) + "..."}</p>
                <p>{item.price}</p>
              </div>
              <div className="productsEditDelete">
                <button>Delete</button>
              </div>
            </div>
          );
        })
      ) : (
        <Spinner />
      )}
      {products.length === 0 && (
        <p>You have no webshops. Create one to get started.</p>
      )}
      <AddProduct webshopId={webshop.webshopData._id} />
    </div>
  );
};

//delete for later
//onClick={() => deleteWebshop(item._id, item.name)}
export default WebshopEdit;
