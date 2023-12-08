//imports
const productsCollection = require("../../models/productCollection");
const webshopCollection = require("../../models/webshopCollection");

//add product
module.exports = async (req, res) => {
  await productsCollection
    .create({
      name: req.body.data.name,
      description: req.body.data.description,
      image: req.body.data.image,
      price: req.body.data.price,
      createdBy: req.body.data.webshop.webshopId,
      createdByUserId: req.session.user.id,
    })
    .then((product) =>
      webshopCollection.findByIdAndUpdate(req.body.data.webshop.webshopId, {
        $push: { products: product._id },
      })
    )
    .then(() => {
      return res.status(200).json({ message: "Product added successfully" });
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(400)
        .json({ error: "Something went wrong. Please try again later" });
    });
};
