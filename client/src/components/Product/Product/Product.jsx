//imports
import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

import "./Product.css";

//spinner/loader
import SpinnerWebshop from "../../Spinner/SpinnerWebshop";

//get product api utility
import getProduct from "../../../api/Product/getProduct";

const Product = () => {
  const location = useLocation();

  //a little bit of a scuffed solution to the problem
  const goBack = location.pathname.slice(1, 15);

  const { product } = useParams();

  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(product).then((data) => {
      setProductData(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="productPage">
      <Link className="productPageBackButton" to={`/${goBack}`}>
        Go back
      </Link>
      {!loading ? (
        <div className="product">
          <img src={productData.image}></img>
          <p>{productData.name}</p>
          <p>{productData.description}</p>
          <p>{productData.price}.00</p>
        </div>
      ) : (
        <SpinnerWebshop />
      )}
    </div>
  );
};

export default Product;
