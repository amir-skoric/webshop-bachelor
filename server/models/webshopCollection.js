const mongoose = require("mongoose");

const webshopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  colorPalette: {
    type: String,
    required: true,
  },
  bannerImage: String,
  categories: Object,
  products: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String
  }
});

const webshopCollection = mongoose.model("webshops", webshopSchema);

module.exports = webshopCollection;
