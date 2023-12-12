//imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProduct.css";
import { useForm } from "react-hook-form";
import axios from "axios";

//spinner/loader
import SpinnerUploading from "../../../components/Spinner/SpinnerUploading";

const EditProduct = ({ product, showPopup }) => {
  //initialize react router dom navigate
  const navigate = useNavigate();
  //react hook form prerequisites
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product?.name,
      shortDescription: product?.shortDescription,
      description: product?.description,
      price: product?.price,
    },
  });

  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  //update product function
  const onSubmit = async (data) => {
    //set loading to true while uploading/updating
    setUploading(true);

    //cloudinary required keys/values
    const preset = import.meta.env.VITE_CLOUDINARY_PRESET;
    const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const url = import.meta.env.VITE_API_URL;

    //if an image is selected then:
    if (data?.image[0] !== undefined) {
      const formData = new FormData();
      const file = data.image[0];
      formData.append("file", file);
      formData.append("upload_preset", preset);
      axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/`,
          formData,
          {
            withCredentials: false,
          }
        )
        //then use the url provided from the cloudinary api to use as our product image
        .then((res) => {
          try {
            axios
              .put(`${url}updateProduct`, {
                data: {
                  id: product?._id,
                  name: data?.name,
                  shortDescription: data?.shortDescription,
                  description: data?.description,
                  price: data?.price,
                  image: res?.data.secure_url,
                  imageId: res?.data.public_id,
                },
                withCredentials: true,
              })
              .then((res) => {
                if (res?.status === 200) {
                  setUploading(false);
                  alert(res?.data.message);
                  navigate("/webshops/" + data?.name, { replace: true });
                }
              });
          } catch (error) {
            setError(error?.response.data.error);
          }
        });
    } else {
      //if no new image is selected, keep the current one saved in the database
      try {
        await axios
          .put(`${url}updateProduct`, {
            data: {
              id: product?._id,
              name: data?.name,
              shortDescription: data?.shortDescription,
              description: data?.description,
              price: data?.price,
              color: data?.color,
              image: product?.image,
            },
            withCredentials: true,
          })
          .then((res) => {
            if (res?.status === 200) {
              alert(res?.data.message);
              window.location.reload();
            }
          });
      } catch (error) {
        setError(error?.response.data.error);
      }
    }
  };

  return (
    <div className="editProduct">
      <div className="editProduct-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form-editProduct">
          <h1 className="h1-editProduct">Edit {product.name}</h1>
          <label className="label-form">Name</label>
          <input
            {...register("name", {
              required: "Enter the name of your product",
            })}
            placeholder="Name"
            type="text"
          />
          <p className="form-error">{errors.name?.message}</p>
          <label className="label-form">Short Description</label>
          <input
            {...register("shortDescription", {
              required: "Describe your product with a few words",
            })}
            placeholder="Short Description"
            type="text"
          />
          <p className="form-error">{errors.shortDescription?.message}</p>
          <label className="label-form">Description</label>
          <textarea
            {...register("description", {
              required: "Describe your product",
            })}
            placeholder="Description"
            type="text"
            rows="6"
            cols="50"
          />
          <p className="form-error">{errors.description?.message}</p>
          <label className="label-form">Price</label>
          <input
            {...register("price", {
              required: "Choose the desired price for your product",
            })}
            placeholder="Price"
            type="number"
          />
          <p className="form-error">{errors.shortDescription?.message}</p>
          <label className="label-form">Current Product Image</label>
          <img src={product.image}></img>
          <input
            {...register("image", {})}
            placeholder="Upload an image"
            type="file"
            accept=".png, .jpg, .jpeg"
          />
          <p className="form-error" style={{ marginBottom: 20 }}>
            {errors.image?.message}
          </p>
          {uploading && <SpinnerUploading />}
          {error.length > 0 && <Error>{error}</Error>}
          <input type="submit" value="Edit" />
        </form>
        <button onClick={() => showPopup(false)} className="editProduct-close">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
