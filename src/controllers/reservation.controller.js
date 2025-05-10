const Reservation = require("../models/Reservation");

exports.reserve = async (req, res) => {
  const reservation = await Reservation.create({
    user: req.user.id,
    book: req.body.book,
  });
  res.status(201).json(reservation);
};

exports.getUserHistory = async (req, res) => {
  const history = await Reservation.find({ user: req.params.id }).populate(
    "book",
    "title"
  );
  res.json(history);
};

exports.getBookHistory = async (req, res) => {
  const history = await Reservation.find({ book: req.params.id }).populate(
    "user",
    "name"
  );
  res.json(history);
};
