//imports
const webshopCollection = require("../../models/webshopCollection");

//delete webshop
module.exports = async (req, res) => {
  const webshopId = req.body.webshopId
  try {
    await webshopCollection.deleteOne({ _id: webshopId });
    return res.status(200).send("Successfully deleted webshop");
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Something went wrong. Please try again later." });
  }
};
