//imports
const webshopCollection = require("../../models/webshopCollection");
const userCollection = require("../../models/userCollection.js");

//add webshop
module.exports = async (req, res) => {
  try {
    //check if webshop with the desired name exists
    const webshopCheck = await webshopCollection.exists({
      name: req.body.data.name,
    });
    console.log(req.body.data);

    if (webshopCheck) {
      return res
        .status(405)
        .send({ error: "Webshop with the desired name already exists" });
    }
    //insert into database collection
    webshopCollection
      .create({
        name: req.body.data.name,
        description: req.body.data.description,
        color: req.body.data.color,
        createdBy: req.session.user.email,
      })
      .catch((error) => res.json(error));
    return res.status(200).json({ message: "Webshop successfully created" });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Something went wrong. Please try again later" });
  }
};
