//imports
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Products.css";

//spinner/loader
import SpinnerWebshopOverview from "../../Spinner/SpinnerWebshopOverview";

//get products api utility
import getProducts from "../../../api/Product/getProducts";

const Products = ({ webshopData }) => {
  const { webshop } = useParams()

  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts(webshopData._id)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })

      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  }, [webshopData]);

  return (
    <div className="productsWebshop">
      <h1 style={{ marginBottom: 40, color: webshopData.color }}>Products</h1>
      <div className="productsOverviewContainer">
        {!loading ? (
          products.map((item) => {
            return (
              <Link key={item._id} to={`/webshops/${webshop}/products/${item._id}`} >
                <div className="productOverview">
                  <img src={item.image}></img>
                  <h3>{item.name}</h3>
                  <p>{item.description.substring(0, 20)}</p>
                  <h2
                    style={{
                      color: webshopData.color,
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    ${item.price}.00
                  </h2>
                </div>
                <button
                  className="webshopAddToCartButton"
                  style={{ background: webshopData.color }}
                >
                  Add to Cart
                </button>
              </Link>
            );
          })
        ) : (
          <SpinnerWebshopOverview />
        )}
      </div>
      {products.length === 0 && <p>No products for sale.</p>}
    </div>
  );
};

export default Products;
