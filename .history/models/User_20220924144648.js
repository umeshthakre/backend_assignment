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
