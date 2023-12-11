//import
import React, { useState } from "react";
import axios from "axios";
import "./WebshopAdd.css";
import { useForm } from "react-hook-form";
import Error from "../Error/Error";
import SpinnerUploading from "../Spinner/SpinnerUploading";

const WebshopAdd = ({ showPopup }) => {
  //react hook form prerequisites
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //submit webshop info to api/database
  const onSubmit = async (data) => {
    //set loading to true while uploading
    setLoading(true);
    //cloudinary required keys/values
    const preset = import.meta.env.VITE_CLOUDINARY_PRESET;
    const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const formData = new FormData();
    const file = data.bannerImage[0];
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
      //then use the url provided from the cloudinary api to use as our bannerImage
      .then((res) => {
        axios
          .post("http://localhost:4000/addWebshop", {
            data: {
              name: data.name,
              shortDescription: data.shortDescription,
              description: data.description,
              color: data.color,
              bannerImage: res.data.secure_url,
              bannerImageId: res.data.public_id,
            },
            withCredentials: true,
          })
          .then((res) => {
            if (res.status === 200) {
              alert(res.data.message);
              setLoading(false);
              window.location.reload();
            }
          })
          .catch((error) => {
            setError(error.response.data.error);
            setLoading(false)
          });
      });
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
          <label className="label-form">Short Description</label>
          <input
            {...register("shortDescription", {
              required: "Describe your webshop with a few words",
            })}
            placeholder="Short Description"
            type="text"
          />
          <p className="form-error">{errors.shortDescription?.message}</p>
          <label className="label-form">Description</label>
          <textarea
            {...register("description", {
              required: "Describe your webshop",
            })}
            placeholder="Description"
            type="text"
            rows="6"
            cols="50"
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
          {loading && <SpinnerUploading />}
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
