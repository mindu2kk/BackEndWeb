const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Enable CORS so the React app can make requests to this server
app.use(cors());

// Hardcoded blog data based on the slide example
const BlogPosts = {
  'first-blog-post': {
    title: 'First Blog Post',
    description: 'Lorem ipsum dolor sit amet, consectetur adip.' 
  },
  'second-blog-post': {
    title: 'Second Blog Post',
    description: 'Hello React Router v6'
  }
};

// API 1: Get a list of all blog posts
app.get('/api/posts', (req, res) => {
  res.json(BlogPosts);
});

// API 2: Get blog details based on the slug
app.get('/api/posts/:slug', (req, res) => {
  const slug = req.params.slug;
  const post = BlogPosts[slug];
  
  if (post) {
    res.json(post);
  } else {
    // Return a 404 status if the post doesn't exist
    res.status(404).json({ message: 'Post not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});