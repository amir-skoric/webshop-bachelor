//imports
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  //get param for redirecting purposes
  const { webshop } = useParams();

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

  //count quantity function
  function countQuantity(arr, targetItem) {
    return arr.filter((item) => item._id === targetItem._id).length;
  }

  //remove from cart and sessionstorage
  const removeFromCart = (itemId) => {
    const indexToRemove = productsInCart.findIndex(
      (item) => item._id === itemId
    );

    if (indexToRemove !== -1) {
      const updatedCart = [...productsInCart];
      updatedCart.splice(indexToRemove, 1);
      setProductsInCart(updatedCart);
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const totalPrice = () => {
    // Iterate through the productsInCart array and calculate the total price
    return productsInCart.reduce((total, item) => {
      return total + item.price * countQuantity(productsInCart, item);
    }, 0);
  };

  return (
    <div className="checkoutAll">
      <Link className="productPageBackButton" to={-1}>
        Go back
      </Link>
      <div className="checkoutPage">
        <h1>Checkout</h1>
        <div className="checkoutTable">
          <h4>Product</h4>
          <h4>Quantity</h4>
          <h4>Price</h4>
        </div>
        <div className="checkoutContainer">
          {!loading &&
          productsInCart.length !== 0 &&
          productsInCartFiltered !== 0 ? (
            productsInCartFiltered.map((item) => {
              const quantity = countQuantity(productsInCart, item);
              if (quantity > 0) {
                return (
                  <div className="checkoutProductWrapper" key={item._id}>
                    <div className="checkoutProductContainer">
                      <Link to={`/webshops/${webshop}/products/${item._id}`}>
                        <div className="checkoutProduct">
                          <img src={item.image}></img>
                          <h4>{item.name}</h4>
                        </div>
                      </Link>
                      <p>{quantity}</p>
                      <p>${item.price * quantity}.00</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="removeFromCart"
                    >
                      Remove
                    </button>
                  </div>
                );
              } else {
                return null;
              }
            })
          ) : (
            <p>No products in cart.</p>
          )}
        </div>
      </div>
      <div className="checkoutTotal">
        <p><strong>Total items in cart: </strong> {productsInCart.length}</p>
        <div className="checkoutTotalPrice">
          <h3>Total Price</h3>
          <h1>{totalPrice()}.00</h1>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
