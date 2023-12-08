const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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
  createdBy: {
    type: String,
    required: true,
  },
  createdByUserId: {
    type: String,
    required: true,
  },
});

const productCollection = mongoose.model("products", productSchema);

module.exports = productCollection;
