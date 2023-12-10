//imports
import React, { useState } from "react";
import "./AddCategory.css";
import { useForm } from "react-hook-form";
import axios from "axios";

//backend error
import Error from "../../Error/Error";

const AddCategory = ({ products, loading, webshopId }) => {
  //react hook form prerequisites
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      await axios
        .post("http://localhost:4000/addCategory", {
          data: {
            webshop: webshopId,
            name: data.name,
            products: data.products,
          },
        })
        .then((res) => {
          alert(res.data.message);
          window.location.reload();
        });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="addProductInfo">
      <form onSubmit={handleSubmit(onSubmit)} className="form-addProduct">
        <h1 className="h1-addProduct">Add a category</h1>
        <p>
          <i>
            If you have no products, you will not be able to create a category.
          </i>
        </p>
        <label className="label-form">Name</label>
        <input
          {...register("name", {
            required: "Please enter the desired name of your category",
          })}
          placeholder="Name"
          type="text"
        />
        <p className="form-error">{errors.name?.message}</p>
        <label className="label-form">
          Products to add to category &#40;select at least one or multiple&#41;
        </label>
        {!loading
          ? products.map((item) => {
              return (
                <div className="addCategoryCheckboxes" key={item._id}>
                  <label
                    htmlFor={item._id}
                    className="label-form categoryLabel"
                  >
                    <input
                      type="checkbox"
                      id={item._id}
                      value={item._id}
                      {...register("products", {
                        required: "Please check at least one product",
                      })}
                    />
                    {item.name}
                  </label>
                </div>
              );
            })
          : null}
        <p className="form-error">{errors.products?.message}</p>
        {error.length > 0 && <Error>{error}</Error>}
        <input type="submit" value="Add Category" />
      </form>
    </div>
  );
};
export default AddCategory;
//
