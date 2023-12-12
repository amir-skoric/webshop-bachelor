//imports
import React from "react";

import "./Category.css"

const Category = ({ filtered, setProducts, category }) => {
  return (
    <div
      className="categorySelector"
      onClick={() => setProducts(filtered)}
      key={category._id}
    >
      <p className="label-form categoryLabel">{category.name}</p>
    </div>
  );
};

export default Category;
