//imports
const productsCollection = require("../../models/productCollection");

//get webshop by user
module.exports = async (req, res) => {
  try {
    const data = await productsCollection.findOne({
      _id: req.params.product,
    });
    if (!data) {
      return res
        .status(404)
        .json({ error: "Product not found" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res
      .status(404)
      .json({ error: "Product not found." });
  }
};
