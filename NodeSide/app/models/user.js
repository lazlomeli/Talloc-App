const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  github_username: {
    type: String,
    required: false,
  },
  github_pat: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
