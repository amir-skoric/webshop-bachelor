const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //Regex function to test if e-mail address includes @-symbol
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "E-mail address is invalid",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const userCollection = mongoose.model("users", userSchema);

module.exports = userCollection;
