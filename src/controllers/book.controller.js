const Book = require("../models/Book");

exports.create = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

exports.getOne = async (req, res) => {
  const book = await Book.findOne({ _id: req.params.id, active: true });
  res.json(book);
};

exports.getAll = async (req, res) => {
  const filters = { active: true };
  if (req.query.title) filters.title = new RegExp(req.query.title, "i");
  if (req.query.author) filters.author = new RegExp(req.query.author, "i");
  if (req.query.genre) filters.genre = req.query.genre;
  const books = await Book.find(filters);
  res.json(books);
};

exports.update = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(book);
};

exports.softDelete = async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, { active: false });
  res.json({ message: "Book disabled" });
};
