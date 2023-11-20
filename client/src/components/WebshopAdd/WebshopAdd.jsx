//import
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./WebshopAdd.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import Error from "../Error/Error";

const WebshopAdd = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { error, setError } = useAuth();

  const onSubmit = async (data) => {
    try {
      await axios
        .post("http://localhost:4000/addWebshop", {
          data,
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Webshop successfully created");
            window.location.reload();
          }
        });
    } catch (error) {
      setError(error.response.data.error);
    }
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
          {error.length > 0 && <Error>{error}</Error>}
          <input type="submit" value="Create" />
        </form>
      </div>
    </div>
  );
};

export default WebshopAdd;
