//imports
const productsCollection = require("../../models/productCollection");
const webshopCollection = require("../../models/webshopCollection");

//add product
module.exports = async (req, res) => {
  if (req.session.user.id === req.body.createdBy) {
    const productId = req.body.productId;
    await productsCollection.deleteOne({ _id: productId });
    await webshopCollection.findByIdAndUpdate(req.body.webshop, {
      $pull: { products: productId },
    });
    await webshopCollection
      .findByIdAndUpdate(
        req.body.webshop,
        {
          $pull: {
            "categories.$[category].products": productId,
          },
        },
        {
          arrayFilters: [
            {
              "category.products": productId,
            },
          ],
        }
      )
      .then(() => {
        return res
          .status(200)
          .json({ message: "Product and references deleted successfully" });
      })
      .catch((error) => {
        return res
          .status(400)
          .json({ error: error });
      });
  } else res.status(400).json({ error: "User not authenticated" });
};
