//imports
const webshopCollection = require("../../models/webshopCollection");

//get webshop by user
module.exports = async (req, res) => {
  try {
    const data = await webshopCollection.findOne({
      name: req.params.webshop,
    });
    if (!data) {
      return res
        .status(404)
        .json({ error: "Webshop not found" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Something went wrong. Please try again later." });
  }
};
