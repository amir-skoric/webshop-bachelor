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
    bannerImage: {
      type: String,
      default: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
      required: true,
    },
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
    createdByEmail: {
      type: String,
      required: true,
    },
    createdById: {
      type: String,
      required: true,
    },
  },
  { minimize: false }
);

const webshopCollection = mongoose.model("webshops", webshopSchema);

module.exports = webshopCollection;
