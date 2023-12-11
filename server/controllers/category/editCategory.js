//imports
const webshopCollection = require("../../models/webshopCollection");

//add category
module.exports = async (req, res) => {
  //update the webshop database document to add updated category
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
        message: "Category successfully updated",
      });
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(409)
        .json({ error: "Something went wrong. Please try again later" });
    });
};
