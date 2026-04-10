const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Cấu trúc array theo slide
const BlogPosts = [
  {
    slug: "first-blog-post",
    title: "First Blog Post",
    description: "Lorem ipsum dolor sit amet, consectetur adip.",
  },
  {
    slug: "second-blog-post",
    title: "Second Blog Post",
    description: "Hello React Router v6",
  },
];

// GET all posts
app.get("/api/posts", (req, res) => {
  res.send(JSON.stringify(BlogPosts));
});

// GET post by slug
app.get("/api/post/:slug", (req, res) => {
  const slug = req.params.slug;
  const post = BlogPosts.find((element) => element.slug === slug);
  if (post) res.send(JSON.stringify(post));
  else res.status(404).send("Not found");
});

// POST new post
app.post("/api/post", (req, res) => {
  const post = {
    slug: req.body.slug,
    title: req.body.title,
    description: req.body.description,
  };
  BlogPosts.push(post);
  res.status(200).send({ message: "Posted successful" });
});

// POST login
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

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
