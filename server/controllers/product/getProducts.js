//imports
const productsCollection = require("../../models/productCollection");

//get webshop by user
module.exports = async (req, res) => {
  try {
    const data = await productsCollection.find({
      createdBy: req.query.webshop,
    });
    if (!data) {
      return res
        .status(204)
        .json({ error: "You have no products. Create one to get started" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Something went wrong. Please try again later." });
  }
};
