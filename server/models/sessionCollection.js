const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  session: {
    type: String,
    required: true,
  },
});

const sessionCollection = mongoose.model("sessions", sessionSchema);

module.exports = sessionCollection;
