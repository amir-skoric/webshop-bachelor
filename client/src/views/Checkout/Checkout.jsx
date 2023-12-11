//imports
import React, { useState, useEffect } from "react";
import "./Checkout.css";

const Checkout = () => {
  const [productsInCart, setProductsInCart] = useState(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart"));
    return storedCart || [];
  });

  const [productsInCartFiltered, setProductsInCartFiltered] = useState({});
  const [loading, setLoading] = useState(true);

  //filter out unique products and save to new array
  useEffect(() => {
    const uniqueProducts = productsInCart.filter(
      (ele, ind) =>
        ind ===
        productsInCart.findIndex(
          (elem) => elem._id === ele._id && elem.id === ele.id
        )
    );
    setProductsInCartFiltered(uniqueProducts);
    setLoading(false);
  }, []);

  console.log(productsInCartFiltered);

  return (
    <div className="checkoutContainer">
      {!loading &&
      productsInCart.length !== 0 &&
      productsInCartFiltered !== 0 ? (
        productsInCartFiltered.map((item) => {
          return (
            <div className="checkout" key={item._id}>
              <p>{item.name}</p>
              <img src={item.image}></img>
            </div>
          );
        })
      ) : (
        <p>No products in cart.</p>
      )}
    </div>
  );
};

export default Checkout;
