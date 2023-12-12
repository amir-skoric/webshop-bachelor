//imports
const webshopCollection = require("../../models/webshopCollection");

//add category
module.exports = async (req, res) => {
  //check if products got selected
  if (!req.body.data.products) {
    return res.status(200).json({
      message: "You have no products selected",
    });
  }

  //update the webshop database document to add the category
  await webshopCollection
    .findByIdAndUpdate(req.body.data.webshop, {
      $push: {
        categories: {
          name: req.body.data.name,
          products: req.body.data.products,
        },
      },
    })
    .then(() => {
      return res.status(200).json({
        message: "Category successfully created",
      });
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(409)
        .json({ error: "Something went wrong. Please try again later" });
    });
};
