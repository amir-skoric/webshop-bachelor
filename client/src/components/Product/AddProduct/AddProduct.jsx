//imports
import React, { useState } from "react";
import "./AddProduct.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../../Error/Error";

const AddProduct = (webshopId) => {
  const navigate = useNavigate();

  //react hook form prerequisites
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    //if an image is selected then:
    //convert image to base64 and set it as a state to use later
    const reader = new FileReader();
    reader.readAsDataURL(data.image[0]);
    reader.onload = async function () {
      try {
        await axios
          .post("http://localhost:4000/addProduct", {
            data: {
              name: data.name,
              description: data.description,
              price: data.price,
              image: reader.result,
              webshop: webshopId,
            },
            withCredentials: true,
          })
          .then((res) => {
            alert(res.data.message);
            navigate(-1);
          });
      } catch (error) {
        setError(error);
      }
    };
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
        <p className="form-error">{errors.name?.message}</p>
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
        {error.length > 0 && <Error>{error}</Error>}
        <input type="submit" value="Add Product" />
      </form>
    </div>
  );
};

export default AddProduct;
