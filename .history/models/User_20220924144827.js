const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: "first name",
  },
  lastname: {
    type: String,
    default: "last name",
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
    default: 0,
  },
  following: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
