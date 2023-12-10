//imports
import React, { useState } from "react";
import "./AddProduct.css";
import { useForm } from "react-hook-form";
import axios from "axios";

//backend error
import Error from "../../Error/Error";

//spinner for uploading
import SpinnerUploading from "../../Spinner/SpinnerUploading";

const AddProduct = (webshopId) => {
  //react hook form prerequisites
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    //cloudinary required keys/values
    const preset = import.meta.env.VITE_CLOUDINARY_PRESET;
    const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    //then use the url provided from the cloudinary api to use as our bannerImage
    const formData = new FormData();
    const file = data.image[0];
    formData.append("file", file);
    formData.append("upload_preset", preset);

    //set loading to true while uploading
    setLoading(true);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/`,
        formData,
        {
          withCredentials: false,
        }
      )
      .then(async (res) => {
        try {
          await axios
            .post("http://localhost:4000/addProduct", {
              data: {
                name: data.name,
                shortDescription: data.shortDescription,
                description: data.description,
                price: data.price,
                image: res.data.secure_url,
                imageId: res.data.public_id,
                webshop: webshopId,
              },
              withCredentials: true,
            })
            .then((res) => {
              alert(res.data.message);
              setLoading(false);
              window.location.reload();
            });
        } catch (error) {
          setError(error);
        }
      });
  };

  return (
    <div className="addProductInfo">
      <form onSubmit={handleSubmit(onSubmit)} className="form-addProduct">
        <h1 className="h1-addProduct">Add a product</h1>
        <label className="label-form">Name</label>
        <input
          {...register("name", {
            required: "Please enter the desired name of your product",
          })}
          placeholder="Name"
          type="text"
        />
        <p className="form-error">{errors.name?.message}</p>{" "}
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
            required: "Describe your product with a few words",
          })}
          placeholder="Description"
          type="text"
          rows="4"
          cols="30"
        />
        <p className="form-error">{errors.description?.message}</p>
        <label className="label-form">Price in USD</label>
        <input
          {...register("price", {
            required: "Please enter the price of your product",
          })}
          placeholder="Price"
          type="number"
        />
        <p className="form-error">{errors.price?.message}</p>
        <label className="label-form">Product Image</label>
        <input
          {...register("image", {
            required: "Upload a product image (jpg, png)",
          })}
          placeholder="Upload an image"
          type="file"
          accept=".png, .jpg, .jpeg"
        />
        <p className="form-error" style={{ marginBottom: 20 }}>
          {errors.image?.message}
        </p>
        {loading && <SpinnerUploading style={{ marginBottom: 20 }} />}
        {error.length > 0 && <Error>{error}</Error>}
        <input type="submit" value="Add Product" />
      </form>
    </div>
  );
};

export default AddProduct;
