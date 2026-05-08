require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const PostRouter = require("./routes/PostRouter");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Simple Blog API is running",
    endpoints: ["/api/posts", "/api/post/:slug", "/api/login"],
  });
});

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "123") {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(400).json({ message: "Login failed" });
  }
});

// Mount post routes
app.use("/api", PostRouter);

// Connect to MongoDB then start server
dbConnect()
  .then(async () => {
    // Migrate old posts that don't have comments field
    const Post = require("./db/postModel");
    await Post.updateMany(
      { comments: { $exists: false } },
      { $set: { comments: [] } }
    );
    console.log("Migration done: comments field ensured on all posts.");

    app.listen(PORT, () => {
      console.log(`Backend server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
