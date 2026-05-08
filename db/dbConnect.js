const mongoose = require("mongoose");

async function dbConnect() {
  const uri = process.env.DB_URL;
  if (!uri) throw new Error("DB_URL environment variable is not set");

  await mongoose.connect(uri);
  console.log("Successfully connected to MongoDB Atlas!");
}

module.exports = dbConnect;
