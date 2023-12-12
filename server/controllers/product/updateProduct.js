//imports
const productCollection = require("../../models/productCollection");

//update product
module.exports = async (req, res) => {
  try {
    //update the database document
    await productCollection
      .findByIdAndUpdate(
        req.body.data.id,
        {
          name: req.body.data.name,
          description: req.body.data.description,
          shortDescription: req.body.data.shortDescription,
          price: req.body.data.price,
          image: req.body.data.image,
        },
        { useFindAndModify: false }
      )
      .then(() => {
        return res.status(200).json({
          message: "Product successfully updated. Please check your changes",
        });
      });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Something went wrong. Please try again later" });
  }
};
