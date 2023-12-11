//imports
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Products.css";

//spinner/loader
import SpinnerWebshopOverview from "../../Spinner/SpinnerWebshopOverview";

//get products api utility
import getProducts from "../../../api/Product/getProducts";

const Products = ({ webshopData }) => {
  //set up navigate
  const navigate = useNavigate();

  const { webshop } = useParams();

  const [products, setProducts] = useState({});

  //gets the cart element from sessionStorage and sets its to an empty array if it doesn't exist
  const [productsCart, setProductsCart] = useState(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart"));
    return storedCart || [];
  });

  const [productsUnfiltered, setProductsUnfiltered] = useState({});
  const [loading, setLoading] = useState(true);

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
            webshopData.categories.map((item) => {
              const filtered = productsUnfiltered.filter((obj) =>
                item.products.includes(obj._id)
              );

              return item.products.length === 0 ? null : (
                <div
                  className="productsCategorySelector"
                  onClick={() => setProducts(filtered)}
                  key={item._id}
                >
                  <p className="label-form productsCategoryLabel">
                    {item.name}
                  </p>
                </div>
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
              products.map((item) => {
                return (
                  <div className="productContainer" key={item._id}>
                    <Link
                      to={`/webshops/${webshop}/products/${item._id}`}
                      state={{ webshopData }}
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
                    </Link>
                    <button
                      onClick={() => addToCart(item)}
                      className="webshopAddToCartButton"
                      style={{ background: webshopData.color }}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleCheckout(item)}
                      className="webshopAddToCartButton"
                      style={{ background: "lightgreen", marginTop: 10 }}
                    >
                      Buy Now
                    </button>
                  </div>
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
