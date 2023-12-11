const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Successfully connected to MongoDB database");
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB database");
  });