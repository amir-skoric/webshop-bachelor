//imports
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./webshopEdit.css";
import { useForm } from "react-hook-form";
import Error from "../../../components/Error/Error";

//add product import
import AddProduct from "../../../components/Product/AddProduct/AddProduct";

//get products api utility
import getProducts from "../../../api/Product/getProducts";

//spinner/loader
import SpinnerWebshopOverview from "../../../components/Spinner/SpinnerWebshopOverview";

const WebshopEdit = () => {
  //used to navigate back to previous page
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  //get state from webshop
  const location = useLocation();
  const webshop = location.state.webshopData;

  //react hook form prerequisites
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: webshop.name,
      description: webshop.description,
      color: webshop.color,
    },
  });

  //doesn't actually work
  function webshopCheck() {
    if (webshop === null) {
      return <h2>Unauthorized access</h2>;
    }
  }

  //delete product function
  async function deleteProduct(id, name) {
    if (window.confirm(`Are you sure you want to delete ${name}?`))
      try {
        await axios
          .delete("http://localhost:4000/deleteProduct", {
            data: {
              productId: id,
              webshop: webshop._id,
              createdBy: webshop.createdById,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              alert(res.data.message);
              getProducts(webshop._id).then((data) => {
                setProducts(data);
                setLoading(false);
              });
            }
          });
      } catch (error) {
        alert(error);
      }
  }

  //update webshop function
  const onSubmit = async (data) => {
    //get webshop id for updating purposes
    data._id = webshop._id;

    //if an image is selected then:
    //convert image to base64 and set it as a state to use later
    const reader = new FileReader();
    if (data.bannerImage[0] !== undefined) {
      reader.readAsDataURL(data.bannerImage[0]);
      reader.onload = async function () {
        try {
          await axios
            .put("http://localhost:4000/updateWebshop", {
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
          console.log(error);
          setError(error.response.data.error);
        }
      };
    } else {
      //if no new image is selected, use the current one saved in the database
      try {
        await axios
          .put("http://localhost:4000/updateWebshop", {
            data: {
              _id: data._id,
              name: data.name,
              description: data.description,
              color: data.color,
              bannerImage: webshop.bannerImage,
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

  //get products from the webshop
  useEffect(() => {
    getProducts(webshop._id)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  }, [webshop]);

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
            <img src={webshop.bannerImage}></img>
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
        <div className="productsEditPage">
          {!loading ? (
            products.map((item) => {
              return (
                <div className="productsContainerEditPage" key={item._id}>
                  <div className="productsEditOverview">
                    <img src={item.image}></img>
                    <h3>{item.name}</h3>
                    <p>{item.description.substring(0, 20) + "..."}</p>
                    <p style={{ color: webshop.color }}>${item.price}</p>
                  </div>
                  <div className="productsEditDelete">
                    <button
                      onClick={() =>
                        deleteProduct(item._id, item.name, item.createdBy)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <SpinnerWebshopOverview />
          )}
        </div>
        {products.length === 0 && (
          <p>You have no products. Create one to get started.</p>
        )}
      </div>

      <AddProduct webshopId={webshop._id} />
    </div>
  );
};

export default WebshopEdit;
