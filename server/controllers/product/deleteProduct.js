//imports
const productsCollection = require("../../models/productCollection");
const webshopCollection = require("../../models/webshopCollection");

//add product
module.exports = async (req, res) => {
  if (req.session.user.id === req.body.createdBy) {
    const productId = req.body.productId;
    productsCollection
      .deleteOne({ _id: productId })
      .then(() =>
        webshopCollection.findByIdAndUpdate(req.body.webshop, {
          $pull: { products: productId },
        })
      )
      .then(() => {
        return res
          .status(200)
          .json({ message: "Product deleted successfully" });
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(400)
          .json({ error: "Something went wrong. Please try again later" });
      });
  } else res.status(400).json({ error: "User not authenticated" });
};
