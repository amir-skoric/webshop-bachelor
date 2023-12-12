//imports
const webshopCollection = require("../../models/webshopCollection");
const productsCollection = require("../../models/productCollection");

//delete webshop
module.exports = async (req, res) => {
  if (req.body.createdById === req.session.user.id) {
    await webshopCollection
      .deleteOne({ _id: req.body.webshopId })
      .then(() => 
        productsCollection.deleteMany({ createdBy: req.body.webshopId })
      )
      .then(() => {
        return res.status(200).json("Successfully deleted webshop");
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(400)
          .json({ error: "Something went wrong. Please try again later" });
      });
  } else return res.status(400).json({ error: "User not authenticated" });
};
