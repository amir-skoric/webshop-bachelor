//imports
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import "./Product.css"

const Product = ({ product, webshopData }) => {
  //set up navigate
  const navigate = useNavigate();

  //get webshop name from params
  const { webshop } = useParams();

  //gets the cart element from sessionStorage and sets its to an empty array if it doesn't exist
  const [productsCart, setProductsCart] = useState(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart"));
    return storedCart || [];
  });

  //add to cart function by setting the old (the one from sessionStorage) array to the new one
  function addToCart(product) {
    setProductsCart((prevProductsCart) => [...prevProductsCart, product]);
    alert("Product added to cart");
  }

  //handlecheckout function that differs a little bit from the previous one above
  function handleCheckout(product) {
    const cartArray = [...productsCart, product];
    sessionStorage.setItem("cart", JSON.stringify(cartArray));
    navigate(`/webshops/${webshop}/checkout`);
  }

  //sets the new array in sessionarray
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(productsCart));
  }, [productsCart]);

  return (
    <div className="productContainer">
      <Link to={`/webshops/${webshop}/products/${product?._id}`}>
        <div className="productOverview">
          <img src={product?.image}></img>
          <h3>{product?.name}</h3>
          <p>{product?.shortDescription.substring(0, 20)}</p>
          <h2
            style={{
              color: webshopData.color,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            ${product?.price}.00
          </h2>
        </div>
      </Link>
      <button
        onClick={() => addToCart(product)}
        className="webshopAddToCartButton"
        style={{ background: webshopData.color }}
      >
        Add to Cart
      </button>
      <button
        onClick={() => handleCheckout(product)}
        className="webshopAddToCartButton"
        style={{ background: "lightgreen", marginTop: 10 }}
      >
        Buy Now
      </button>
    </div>
  );
};

export default Product;
