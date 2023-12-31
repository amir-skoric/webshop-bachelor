//imports
const webshopCollection = require("../../models/webshopCollection");

//update webshop
module.exports = async (req, res) => {
  try {
    //check if webshop with the desired name exists
    const webshopCheck = await webshopCollection.exists({
      name: req.body.data.name,
    });
    const webshopCheck2 = await webshopCollection.findOne({
      name: req.body.data.name,
    });

    //if the current webshop name is the same as the one we found in the query,
    if (webshopCheck && webshopCheck2.name !== req.body.data.name) {
      return res
        .status(409)
        .json({ error: "Webshop with the desired name already exists" });
    }

    //update the database document
    await webshopCollection
      .findByIdAndUpdate(
        req.body.data._id,
        {
          name: req.body.data.name,
          description: req.body.data.description,
          shortDescription: req.body.data.shortDescription,
          color: req.body.data.color,
          bannerImage: req.body.data.bannerImage,
        },
        { useFindAndModify: false }
      )
      .then(() => {
        return res
          .status(200)
          .json({
            message: "Webshop successfully updated. Please check your changes",
          });
      })
      .catch((error) => {
        return res.status(409).json({ error: "Webshop with the desired name already exists" });
      });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Something went wrong. Please try again later" });
  }
};
