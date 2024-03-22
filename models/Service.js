const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  service: [
    {
      amount: { type: String, required: true },
      service: { type: String, required: true },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "form",
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "form" },
});

FormSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = Service = mongoose.model("service", FormSchema);
