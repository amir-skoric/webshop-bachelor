//imports
const userCollection = require("../../models/userCollection.js");
const webshopCollection = require("../../models/webshopCollection.js");
const productsCollection = require("../../models/productCollection.js");

//register
module.exports = async (req, res) => {
  if (req.body.createdById === req.session.user.id) {
    await userCollection
      .findByIdAndDelete(req.body.createdById)
      .then(() =>
        webshopCollection.deleteMany({ createdById: req.body.createdById })
      )
      .then(() =>
        productsCollection.deleteMany({ createdByUserId: req.body.createdById })
      )
      .then(() => {
        return res
          .status(200)
          .json({ message: "Account deleted successfully" });
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(400)
          .json({ error: "Something went wrong. Please try again later" });
      });
  }
};
