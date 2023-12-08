//imports
const webshopCollection = require("../../models/webshopCollection");

//add webshop
module.exports = async (req, res) => {
  //check if webshop with the desired name exists
  const webshopCheck = await webshopCollection.exists({
    name: req.body.data.name,
  });
  if (webshopCheck) {
    return res
      .status(405)
      .json({ error: "Webshop with the desired name already exists" });
  }
  //insert into database collection
  webshopCollection
    .create({
      name: req.body.data.name,
      description: req.body.data.description,
      color: req.body.data.color,
      bannerImage: req.body.data.bannerImage,
      createdByEmail: req.session.user.email,
      createdById: req.session.user.id,
    })
    .then(() => {
      return res.status(200).json({ message: "Webshop successfully created" });
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(400)
        .json({ error: "Something went wrong. Please try again later" });
    });
};
