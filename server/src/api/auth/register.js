//imports
const userCollection = require("../../models/userCollection.js");
const bcrypt = require("bcrypt");

//register
module.exports = async (req, res) => {
  //check if an user with the chosen email exists
  const userCheck = await userCollection.exists({
    email: req.body.data.email,
  });
  if (userCheck) {
    return res.status(405).json({ error: "User already exists" });
  }
  //hashing the password with bcrypt
  req.body.data.password = await bcrypt.hash(req.body.data.password, 10);
  //registering the user into the database collection
  userCollection
    .create(req.body.data)
    .then((user) => res.json(user))
    .catch((error) => {
      console.log(error);
      return res
        .status(400)
        .json({ error: "Something went wrong. Please try again later" });
    });
};
