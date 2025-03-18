const mongoose = require("mongoose");

const AiNewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String , required: true },
  link: { type: String , required: true },
});

module.exports = mongoose.model("AiNews", AiNewsSchema);
