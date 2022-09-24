const Schema = mongoose.Schema;
const User = new Schema({
  email: String,
  password: String,
  followers: {
    type: Number,
    default: 0,
  },
  followeing: {
    type: Number,
    default: 0,
  },
});
