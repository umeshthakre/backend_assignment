const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    max: 1000,
  },
  description: {
    type: String,
    max: 10000,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comment: [
    {
      _id: mongoose.SchemaTypes.ObjectId,
      comment_description: {
        type: String,
        max: 10000,
      },
    },
  ],

  created_at: Date.now(),
});

module.exports = mongoose.model("Post", PostSchema);
