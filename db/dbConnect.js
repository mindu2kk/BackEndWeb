const mongoose = require("mongoose");

async function dbConnect() {
  const uri = process.env.DB_URL;
  if (!uri) throw new Error("DB_URL environment variable is not set");

  await mongoose
    .connect(uri)
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = dbConnect;
