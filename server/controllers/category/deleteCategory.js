//imports
const webshopCollection = require("../../models/webshopCollection");

//delete category
module.exports = async (req, res) => {
  //update the webshop database document to add the category
  await webshopCollection
    .findByIdAndUpdate(req.body.webshop, {
      $pull: {
        categories: { _id: req.body.categoryId },
      },
    })
    .then(() => {
      return res.status(200).json({
        message: "Category successfully deleted",
      });
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(409)
        .json({ error: "Something went wrong. Please try again later" });
    });
};
