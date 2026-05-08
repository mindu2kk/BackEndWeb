const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, "Please provide an author name"],
  },
  content: {
    type: String,
    required: [true, "Please provide comment content"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, "Please provide slug"],
    unique: [true, "Slug already exists"],
  },
  title: {
    type: String,
    required: [true, "Please provide a title!"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description!"],
  },
  comments: {
    type: [CommentSchema],
    default: [],
  },
});

module.exports = mongoose.model.Posts || mongoose.model("Posts", PostSchema);
