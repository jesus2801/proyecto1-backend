const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  reserveDate: { type: Date, default: Date.now },
  returnDate: Date,
});

module.exports = mongoose.model("Reservation", reservationSchema);
