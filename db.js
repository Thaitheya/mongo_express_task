const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to DB :)");
  } catch (error) {
    console.error("Connecting to DB failed):", error.message);
  }
};

module.exports = connectDB;
