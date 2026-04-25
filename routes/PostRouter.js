const express = require("express");
const Post = require("../db/postModel");

const router = express.Router();

// POST /api/post — create new post
router.post("/post", async (request, response) => {
  const { slug, title, description } = request.body;
  if (!slug || !title || !description) {
    return response.status(400).send({ error: "slug, title, and description are required" });
  }
  const post = new Post(request.body);
  try {
    await post.save();
    response.status(201).send(post);
  } catch (error) {
    if (error.code === 11000) {
      return response.status(409).send({ error: "Slug already exists" });
    }
    response.status(500).send({ error: "Internal server error" });
  }
});

// GET /api/posts — get all posts
router.get("/posts", async (request, response) => {
  try {
    const posts = await Post.find({});
    response.status(200).send(posts);
  } catch (error) {
    response.status(500).send({ error: "Internal server error" });
  }
});

// GET /api/post/:slug — get post by slug
router.get("/post/:slug", async (request, response) => {
  try {
    const post = await Post.findOne({ slug: request.params.slug });
    if (!post) {
      return response.status(404).send({ error: "Post not found" });
    }
    response.status(200).send(post);
  } catch (error) {
    response.status(500).send({ error: "Internal server error" });
  }
});

// PATCH /api/post/:slug — update post by slug
router.patch("/post/:slug", async (request, response) => {
  if (!request.body || Object.keys(request.body).length === 0) {
    return response.status(400).send({ error: "Request body cannot be empty" });
  }
  try {
    const post = await Post.findOneAndUpdate(
      { slug: request.params.slug },
      request.body,
      { new: true }
    );
    if (!post) {
      return response.status(404).send({ error: "Post not found" });
    }
    response.status(200).send(post);
  } catch (error) {
    response.status(500).send({ error: "Internal server error" });
  }
});

// DELETE /api/post/:slug — delete post by slug
router.delete("/post/:slug", async (request, response) => {
  try {
    const post = await Post.findOneAndDelete({ slug: request.params.slug });
    if (!post) {
      return response.status(404).send({ error: "Post not found" });
    }
    response.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    response.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
