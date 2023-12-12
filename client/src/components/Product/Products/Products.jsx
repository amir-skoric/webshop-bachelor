//imports
import React, { useState, useEffect } from "react";
import "./Products.css";

//spinner/loader
import SpinnerWebshopOverview from "../../Spinner/SpinnerWebshopOverview";

//get products api utility
import getProducts from "../../../api/Product/getProducts";

//product component
import Product from "../Product/Product";

//category component
import Category from "../../Category/Category";

const Products = ({ webshopData }) => {
  //set up states
  const [products, setProducts] = useState({});
  const [productsUnfiltered, setProductsUnfiltered] = useState({});
  const [loading, setLoading] = useState(true);

  //getting the products from the webshop
  useEffect(() => {
    getProducts(webshopData._id)
      .then((data) => {
        setProducts(data);
        setProductsUnfiltered(data);
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
      const sortedArray = products.toSorted((a, b) =>
        a.price > b.price ? 1 : -1
      );
      setProducts([...sortedArray]);
    } else if (e.target.value === "highToLow") {
      const sortedArray = products.toSorted((a, b) =>
        b.price > a.price ? 1 : -1
      );
      setProducts([...sortedArray]);
    } else {
      setProducts(productsUnfiltered);
    }
  }

  return (
    <div className="productsSection">
      <div className="productsContainer">
        <div className="productsCategories">
          <h1 style={{ marginBottom: 20, color: webshopData.color }}>
            Categories
          </h1>
          <p
            className="productsAllShow"
            onClick={() => setProducts(productsUnfiltered)}
          >
            All products
          </p>
          {!loading && webshopData.categories?.length > 0 ? (
            webshopData.categories?.map((item) => {
              const filtered = productsUnfiltered.filter((obj) =>
                item.products.includes(obj._id)
              );
              return item.products.length === 0 ? null : (
                <Category
                  category={item}
                  setProducts={setProducts}
                  filtered={filtered}
                  key={item._id}
                />
              );
            })
          ) : (
            <p>No categories.</p>
          )}
        </div>
        <div className="productsWebshop">
          <h1
            style={{
              marginBottom: 20,
              marginLeft: 60,
              color: webshopData.color,
            }}
          >
            Products
          </h1>
          <p style={{ marginBottom: 20, marginLeft: 60 }}>Sort by</p>
          <select
            defaultValue="default"
            onChange={sortByPrice}
            style={{ marginBottom: 20, marginLeft: 60 }}
          >
            <option value="popularity">Popularity</option>
            <option value="lowToHigh">Low to high price</option>
            <option value="highToLow">High to low price</option>
          </select>
          <div className="productsOverviewContainer">
            {!loading ? (
              products?.map((item) => {
                return (
                  <Product
                    product={item}
                    webshopData={webshopData}
                    key={item._id}
                  />
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
