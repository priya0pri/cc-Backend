const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'form', 
  },
  amount: {
    type: String,
  },
  service: {
    type: String,
    required: true,
  },
});

FormSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = Service = mongoose.model("service", FormSchema);
