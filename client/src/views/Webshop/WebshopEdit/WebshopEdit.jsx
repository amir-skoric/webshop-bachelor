//imports
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./WebshopEdit.css";
import { useForm } from "react-hook-form";
import Error from "../../../components/Error/Error";

//add product import
import AddProduct from "../../../components/Product/AddProduct/AddProduct";
//edit product import
import EditProduct from "../../../components/Product/EditProduct/EditProduct";
//add category import
import AddCategory from "../../../components/Product/AddCategory/AddCategory";

//get products api utility
import getProducts from "../../../api/Product/getProducts";

//spinner/loader
import SpinnerWebshopOverview from "../../../components/Spinner/SpinnerWebshopOverview";
import SpinnerUploading from "../../../components/Spinner/SpinnerUploading";

const WebshopEdit = () => {
  //used to navigate back to previous page
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [products, setProducts] = useState({});
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  //get state from webshop
  const location = useLocation();
  const webshop = location.state?.webshopData;

  //react hook form prerequisites
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: webshop?.name,
      shortDescription: webshop?.shortDescription,
      description: webshop?.description,
      color: webshop?.color,
    },
  });

  //function used to show the editProduct component
  function editProductPopup(item) {
    setShowPopup(true);
    setProduct(item);
  }

  //delete product function
  async function deleteProduct(id, name) {
    const url = import.meta.env.VITE_API_URL;
    if (window.confirm(`Are you sure you want to delete ${name}?`))
      try {
        await axios
          .delete(`${url}deleteProduct`, {
            data: {
              productId: id,
              webshop: webshop?._id,
              createdBy: webshop?.createdById,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              alert(res.data.message);
              getProducts(webshop?._id).then((data) => {
                setProducts(data);
                setLoading(false);
              });
            }
          });
      } catch (error) {
        alert(error);
      }
  }

  //delete category function
  async function deleteCategory(id, name) {
    const url = import.meta.env.VITE_API_URL;
    if (window.confirm(`Are you sure you want to delete ${name}?`))
      try {
        await axios
          .delete(`${url}deleteCategory`, {
            data: {
              categoryId: id,
              webshop: webshop?._id,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              alert(res.data.message);
              navigate(-1);
            } else {
              alert(res.data.error);
            }
          });
      } catch (error) {
        alert(error);
      }
  }

  //update webshop function
  const onSubmit = async (data) => {
    //get webshop id for updating purposes
    data._id = webshop?._id;

    //set loading to true while uploading/updating
    setUploading(true);

    //cloudinary required keys/values
    const preset = import.meta.env.VITE_CLOUDINARY_PRESET;
    const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const url = import.meta.env.VITE_API_URL;

    //if an image is selected then:
    if (data?.bannerImage[0] !== undefined) {
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
          try {
            axios
              .put(`${url}updateWebshop`, {
                data: {
                  _id: data?._id,
                  name: data?.name,
                  shortDescription: data?.shortDescription,
                  description: data?.description,
                  color: data?.color,
                  bannerImage: res?.data.secure_url,
                  bannerImageId: res?.data.public_id,
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
          .put(`${url}updateWebshop`, {
            data: {
              _id: data?._id,
              name: data?.name,
              shortDescription: data?.shortDescription,
              description: data?.description,
              color: data?.color,
              bannerImage: webshop?.bannerImage,
            },
            withCredentials: true,
          })
          .then((res) => {
            if (res?.status === 200) {
              alert(res?.data.message);
              navigate("/webshops/" + data?.name, { replace: true });
            }
          });
      } catch (error) {
        setError(error?.response.data.error);
      }
    }
  };

  //signout function
  async function signout() {
    const url = import.meta.env.VITE_API_URL;
    await axios
      .get(`${url}signout`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          navigate("/login");
          window.location.reload();
        } else {
          alert("An error occurred trying to log out");
        }
      });
  }

  //get products from the webshop
  useEffect(() => {
    getProducts(webshop?._id)
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
      <button className="webshopEditSignOutButton" onClick={() => signout()}>
        Sign out
      </button>
      {webshop ? (
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
            <label className="label-form">Short Description</label>
            <input
              {...register("shortDescription", {
                required: "Describe your webshop with a few words",
              })}
              placeholder="Short Descripton"
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
            <img src={webshop?.bannerImage}></img>
            <input
              {...register("bannerImage", {})}
              placeholder="Upload an image"
              type="file"
              accept=".png, .jpg, .jpeg"
            />
            {uploading && <SpinnerUploading />}
            {error.length > 0 && <Error>{error}</Error>}
            <input type="submit" value="Save changes" />
          </form>
          <div className="webshopEditProducts">
            <h1>My Products</h1>
            <div className="productsEditPage">
              {!loading ? (
                products.map((item) => {
                  return (
                    <div className="productsContainerEditPage" key={item._id}>
                      <Link
                        to={`/webshops/${webshop.name}/products/${item._id}`}
                      >
                        <div className="productsEditOverview">
                          <img src={item.image}></img>
                          <h3>{item.name}</h3>
                          <p>
                            {item.shortDescription.substring(0, 20) + "..."}
                          </p>
                          <p style={{ color: webshop.color }}>${item.price}</p>
                        </div>
                      </Link>
                      <div className="productsEditDelete">
                        <button
                          className="productsEditButton"
                          onClick={() => editProductPopup(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="productsDeleteButton"
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
          <div className="webshopEditCategories">
            <h1>My Categories</h1>
            {!loading && webshop.categories?.length > 0 ? (
              webshop.categories?.map((item) => {
                return (
                  <div
                    className="webshopEditCategoriesOverviewContainer"
                    key={item._id}
                  >
                    <div className="webshopEditCategoriesOverview">
                      <p>{item.name}</p>
                    </div>
                    <div className="webshopEditCategoriesButtonContainer">
                      <button
                        className="webshopEditCategoriesEdit"
                        onClick={() => console.log("Does not work")}
                      >
                        Edit
                      </button>
                      <button
                        className="webshopEditCategoriesDelete"
                        onClick={() => deleteCategory(item._id, item.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ marginTop: 20 }}>No categories found.</p>
            )}
          </div>
          <AddCategory
            webshopId={webshop?._id}
            products={products}
            loading={loading}
          />
          <AddProduct webshopId={webshop?._id} />
          {showPopup && (
            <EditProduct showPopup={setShowPopup} product={product} />
          )}
        </div>
      ) : (
        <h1>Unauthorized Access</h1>
      )}
    </div>
  );
};

export default WebshopEdit;
