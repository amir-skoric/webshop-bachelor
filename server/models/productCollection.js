const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  products: {
    image: String,
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
});

const productCollection = mongoose.model("products", productSchema);

module.exports = productCollection;
