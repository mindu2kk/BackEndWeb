const express = require("express");
const cors = require("cors");

const app = express();
// Sử dụng process.env.PORT của CodeSandbox, nếu không có thì fallback về 8080
const PORT = process.env.PORT || 8080;

// Kích hoạt CORS (Rất quan trọng vì Frontend của bạn chạy ở một URL CodeSandbox khác)
app.use(cors());

// Dữ liệu mock cứng theo slide bài giảng
const BlogPosts = {
  "first-blog-post": {
    title: "First Blog Post",
    description: "Lorem ipsum dolor sit amet, consectetur adip.",
  },
  "second-blog-post": {
    title: "Second Blog Post",
    description: "Hello React Router v6",
  },
};

// API 1: Lấy danh sách toàn bộ bài viết
app.get("/api/posts", (req, res) => {
  res.json(BlogPosts);
});

// API 2: Lấy chi tiết bài viết dựa theo slug
app.get("/api/posts/:slug", (req, res) => {
  const slug = req.params.slug;
  const post = BlogPosts[slug];

  if (post) {
    res.json(post);
  } else {
    // Trả về mã lỗi 404 nếu không tìm thấy bài viết
    res.status(404).json({ message: "Post not found" });
  }
});

// Lắng nghe port
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
