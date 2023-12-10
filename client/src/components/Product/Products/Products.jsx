//imports
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Products.css";

//spinner/loader
import SpinnerWebshopOverview from "../../Spinner/SpinnerWebshopOverview";

//get products api utility
import getProducts from "../../../api/Product/getProducts";

const Products = ({ webshopData }) => {
  const { webshop } = useParams();

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

  //sort by option selected function
  function sortByPrice(e) {
    if (e.target.value === "lowToHigh") {
      const sortedArray = products.sort((a, b) => (a.price > b.price ? 1 : -1));
      setProducts([...sortedArray]);
    } else {
      const sortedArray = products.sort((a, b) => (b.price > a.price ? 1 : -1));
      setProducts([...sortedArray]);
    }
  }


  return (
    <div className="productsSection">
      <div className="productsContainer">
        <div className="productsCategories">
          <h1 style={{ marginBottom: 20, color: webshopData.color }}>
            Categories
          </h1>
          {!!webshopData.categories && (
            <p style={{ marginBottom: 20 }}>All products</p>
          )}
        </div>
        <div className="productsWebshop">
          <h1
            style={{
              marginBottom: 20,
              marginLeft: 20,
              color: webshopData.color,
            }}
          >
            Products
          </h1>
          <p style={{ marginBottom: 20, marginLeft: 20 }}>Sort by</p>
          <select
            defaultValue="default"
            onChange={sortByPrice}
            style={{ marginBottom: 20, marginLeft: 20 }}
          >
            <option value="default" disabled="disabled">
              -- Sort by --
            </option>
            <option value="lowToHigh">Low to high price</option>
            <option value="highToLow">High to low price</option>
          </select>
          <div className="productsOverviewContainer">
            {!loading ? (
              products.map((item) => {
                return (
                  <Link
                    key={item._id}
                    to={`/webshops/${webshop}/products/${item._id}`}
                  >
                    <div className="productOverview">
                      <img src={item.image}></img>
                      <h3>{item.name}</h3>
                      <p>{item.shortDescription.substring(0, 20)}</p>
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
        </div>
      </div>
      {products.length === 0 && <p>No products for sale.</p>}
    </div>
  );
};

export default Products;
