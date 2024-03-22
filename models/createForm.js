const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema(
  {
    userFormId: mongoose.Schema.Types.ObjectId,

    name: {
      type: String,
    },
    homeType: {
      type: String,
    },
    street: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    rooms: {
      type: Number,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { strictPopulate: false }
);

module.exports = Form = mongoose.model("form", FormSchema);
