const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    max: 1000,
  },
  description: {
    max: 10000,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comment: [
    {
      _id: mongoose.SchemaTypes.ObjectId,
      description: {
        type: String,
        required: true,
        max: 10000,
      },
    },
  ],
  // todo comments

  created_at: Date.now(),
});

module.exports = mongoose.model("Post", PostSchema);
