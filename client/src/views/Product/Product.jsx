//imports
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import "./Product.css";

//spinner/loader
import SpinnerWebshop from "../../components/Spinner/SpinnerWebshop";

//get api utility
import getProduct from "../../api/Product/getProduct";
import getWebshop from "../../api/Webshop/getWebshop";

const Product = () => {
  //set up navigate
  const navigate = useNavigate();

  const { product } = useParams();
  const { webshop } = useParams();

  const [productData, setProductData] = useState({});
  const [webshopData, setWebshopData] = useState({});
  const [loading, setLoading] = useState(true);

  //gets the cart element from sessionStorage and sets its to an empty array if it doesn't exist
  const [productsCart, setProductsCart] = useState(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart"));
    return storedCart || [];
  });

  //add to cart function by setting the old (the one from sessionStorage) array to the new one
  function addToCart(product) {
    setProductsCart((prevProductsCart) => [...prevProductsCart, product]);
    alert("Product added to cart");
    console.log(productsCart);
  }

  //handlecheckout function that differs a little bit from the previous one above
  function handleCheckout(product) {
    const cartArray = [...productsCart, product];
    sessionStorage.setItem("cart", JSON.stringify(cartArray));
    navigate(`/webshops/${webshop}/checkout`);
  }

  //sets the new array as the sessionstorage
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(productsCart));
  }, [productsCart]);

  useEffect(() => {
    getWebshop(webshop).then((data) => {
      setWebshopData(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getProduct(product).then((data) => {
      setProductData(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="productPage">
      <Link className="productPageBackButton" to={`/webshops/${webshop}`}>
        Go back
      </Link>
      {!loading ? (
        <div className="product">
          <div className="productLeft">
            <img src={productData.image}></img>
          </div>
          <div className="productRight">
            <div className="productRightContainerTitle">
              <h1 style={{ color: webshopData.color }}>{productData.name}</h1>
              <h3>
                <i>{productData.shortDescription}</i>
              </h3>
              <p>{productData.serial}</p>
            </div>
            <h4>Description</h4>
            <p>
              <i>{productData.description}</i>
            </p>
            <h2>${productData.price}.00</h2>
            <div className="productButtons">
              <button
                onClick={() => addToCart(productData)}
                className="webshopAddToCartButton"
                style={{ background: webshopData.color, width: 200 }}
              >
                Add to Cart
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleCheckout(productData);
                }}
                className="webshopAddToCartButton"
                style={{ background: "lightgreen", width: 200 }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <SpinnerWebshop />
      )}
    </div>
  );
};

export default Product;
