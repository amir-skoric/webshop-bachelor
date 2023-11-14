//imports
const userCollection = require("../../models/userCollection.js");
const bcrypt = require("bcrypt");

//register
module.exports = async (req, res) => {
  try {
    //check if an user with the chosen email exists
    const userCheck = await userCollection.exists({ email: req.body.email });
    if (userCheck) {
      return res.status(405).send("User already exists");
    }
    //hashing the password with bcrypt
    req.body.password = await bcrypt.hash(req.body.password, 10);
    //registering the user into the database collection
    userCollection
      .create(req.body)
      .then((user) => res.json(user))
      .catch((error) => res.json(error));
  } catch (error) {
    console.log(error);
  }
};
