//imports
const webshopCollection = require("../../models/webshopCollection");

//get webshop by user
module.exports = async (req, res) => {
  try {
    const data = await webshopCollection.find({
      createdBy: req.session.user.email,
    });
    if (!data) {
      return res
        .status(204)
        .json({ error: "You have no webshop. Create one to get started" });
    } else {
      return res.status(200).send(data);
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Something went wrong. Please try again later." });
  }
};
