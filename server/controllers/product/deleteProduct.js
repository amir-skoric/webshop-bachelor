//imports
const productsCollection = require("../../models/productCollection");
const webshopCollection = require("../../models/webshopCollection");

//add product
module.exports = async (req, res) => {
  const productId = req.body.productId;
  try {
    productsCollection
      .deleteOne({ _id: productId })
      .then(() =>
        webshopCollection.findByIdAndUpdate(req.body.webshop, {
          $pull: { products: productId },
        })
      )
      .catch((error) => console.log(error));
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Something went wrong. Please try again later" });
  }
};
