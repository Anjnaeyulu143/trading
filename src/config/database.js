const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://Azax:DeKZ8WLpSELZxWk2@cluster0.9h792.mongodb.net/";

const connectDB = async () => {
  await mongoose.connect(connectionString);
  console.log("Database connection established");
};

module.exports = { connectDB };
