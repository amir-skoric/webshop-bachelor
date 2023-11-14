//imports
const userCollection = require("../../models/userCollection.js");
const bcrypt = require("bcrypt");

//login
module.exports = async (req, res) => {
  //see if user with the given email address exists
  const user = await userCollection.findOne({ email: req.body.email });
  if (user) {
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      //if the password is incorrect, throw an error
      return res.status(404).send("Wrong credentials");
    } else {
      delete user.password;

      req.session.user = {
        user: {
          id: user._id,
          email: user.email,
        }
      }
      req.session.isAuthenticated = true;
      res.status(200).json({
        authenticated: req.session.isAuthenticated,
        user: {
          id: user._id,
          email: user.email,
        }
      });
    }
  } else {
    //if user does not exist, throw the same error
    return res.status(404).send("Wrong credentials");
  }
};
