const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publisher: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  copies: { type: Number, required: true, min: 0 },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("Book", bookSchema);
