require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const PostRouter = require("./routes/PostRouter");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Login endpoint (unchanged)
app.post("/api/login", (req, res) => {
  const creds = {
    username: req.body.username,
    password: req.body.password,
  };
  if (creds.username === "admin" && creds.password === "123") {
    res.status(200).send({ message: "Login successful" });
  } else {
    res.status(400).send({ message: "Login failed" });
  }
});

(async () => {
  try {
    await dbConnect();
    app.use("/api", PostRouter);
    app.listen(PORT, () => {
      console.log(`Backend server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
})();
