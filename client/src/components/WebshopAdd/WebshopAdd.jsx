//import
import React, { useState } from "react";
import axios from "axios";
import "./WebshopAdd.css";
import { useForm } from "react-hook-form";
import Error from "../Error/Error";

const WebshopAdd = ({ showPopup }) => {
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
    reader.readAsDataURL(data.bannerImage[0]);
    reader.onload = async function () {
      try {
        await axios
          .post("http://localhost:4000/addWebshop", {
            data: {
              name: data.name,
              description: data.description,
              color: data.color,
              bannerImage:
                reader.result
            },
            withCredentials: true,
          })
          .then((res) => {
            if (res.status === 200) {
              alert(res.data.message);
              window.location.reload();
            }
          });
      } catch (error) {
        setError(error.response.data.error);
      }
    };
  };

  return (
    <div className="webshopadd">
      <div className="webshopadd-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form-webshopadd">
          <h1 className="h1-webshopadd">Create a new webshop</h1>
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
              required: "Please enter input the primary color of your webshop",
            })}
            placeholder="color"
            type="color"
          />
          <p className="form-error">{errors.color?.message}</p>
          <label className="label-form">Banner Image</label>
          <input
            {...register("bannerImage", {
              required: "Upload a banner image (jpg, png)",
            })}
            placeholder="Upload an image"
            type="file"
            accept=".png, .jpg, .jpeg"
          />
          <p className="form-error" style={{ marginBottom: 20 }}>
            {errors.bannerImage?.message}
          </p>
          {error.length > 0 && <Error>{error}</Error>}
          <input type="submit" value="Create" />
        </form>
        <button onClick={() => showPopup(false)} className="webshopadd-close">
          Close
        </button>
      </div>
    </div>
  );
};

export default WebshopAdd;
