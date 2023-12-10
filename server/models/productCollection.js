const mongoose = require("mongoose");
const randomString = require("randomstring");

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
    },
    createdByUserId: {
      type: String,
      required: true,
    },
    serial: {
      type: String,
      default: randomString.generate({
        length: 12,
        capitalization: "uppercase",
      }),
    },
  },
  { minimize: false }
);

const productCollection = mongoose.model("products", productSchema);

module.exports = productCollection;
