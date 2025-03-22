const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  tags: { type: Array },
  date: { type: Date },
  time: { type: String },
  links: [
    {
      name: { type: String },
      link: { type: String },
      description: { type: String },
    },
  ]
});

module.exports = mongoose.model("Data", dataSchema);
