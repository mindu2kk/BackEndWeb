const mongoose = require("mongoose");

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
});

module.exports = mongoose.model.Posts || mongoose.model("Posts", PostSchema);
