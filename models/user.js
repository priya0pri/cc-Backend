const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
