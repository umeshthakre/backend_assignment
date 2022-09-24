const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    max: 100,
    required: true,
  },
  description: {
    type: String,
    max: 10000,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },

  comments: [
    {
      _id: mongoose.SchemaTypes.ObjectId,
      description: {
        type: String,
        max: 1000,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Post", PostSchema);
