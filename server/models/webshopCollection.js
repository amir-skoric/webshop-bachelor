const mongoose = require("mongoose");

const webshopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    bannerImage: String,
    categories: {
      type: Object,
      default: {},
    },
    products: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { minimize: false }
);

const webshopCollection = mongoose.model("webshops", webshopSchema);

module.exports = webshopCollection;
