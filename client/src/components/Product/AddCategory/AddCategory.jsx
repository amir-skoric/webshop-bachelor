//imports
import React, { useState } from "react";
import "./AddCategory.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//backend error
import Error from "../../Error/Error";

const AddCategory = ({ products, loading, webshopId }) => {
  //react router dom navigation
  const navigate = useNavigate();
  //react hook form prerequisites
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  //add category function
  const onSubmit = async (data) => {
    if (!data.products) {
      return setError("You can't create a category without products");
    }
    {
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
            console.log(res);
            if (res.status === 200) {
              alert(res.data.message);
              navigate(-1);
            } else {
              alert(res.data.error);
            }
          });
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <div className="addProductInfo">
      <form onSubmit={handleSubmit(onSubmit)} className="form-addProduct">
        <h1 className="h1-addProduct">Add a category</h1>
        <p style={{ marginBottom: 20 }}>
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
        {!loading && products.length > 0 ? (
          products.map((item) => {
            return (
              <div className="addCategoryCheckboxes" key={item._id}>
                <label htmlFor={item._id} className="label-form categoryLabel">
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
        ) : (
          <p>You have no products.</p>
        )}
        <p className="form-error">{errors.products?.message}</p>
        {error.length > 0 && <Error>{error}</Error>}
        <input type="submit" value="Add Category" />
      </form>
    </div>
  );
};
export default AddCategory;
//
