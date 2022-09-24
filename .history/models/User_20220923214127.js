const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const User = new Schema({
  email: String,
  password: String,
  followers: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
  likes: {
    type: [ObjectId],
  },
  comment: {
    type: [ObjectId],
  },
});
