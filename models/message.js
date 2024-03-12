const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  room: String,
  sender: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = Message = mongoose.model("Message", messageSchema);
