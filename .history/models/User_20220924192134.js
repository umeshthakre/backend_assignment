const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: "first name",
    max: 100,
  },
  username: {
    type: String,
    max: 100,
  },
  lastname: {
    type: String,
    default: "last name",
    max: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  numberOfFollowers: {
    type: Number,
    default: 0,
  },
  numberOfFollowing: {
    type: Number,
    default: 0,
  },
  followers: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  following: {
    type: [mongoose.SchemaTypes.ObjectId],
  },

  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
