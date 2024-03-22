const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  distance: {
    type: Number,
  },
});

module.exports = Expert = mongoose.model("expert", expertSchema);
