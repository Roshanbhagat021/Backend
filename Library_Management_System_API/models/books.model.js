const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ISBN: { type: String, unique: true, required: true },
  summary: { String },
  publicationDate: { type: Date },
  genres: { type: [String] },
  copiesAvailable: { type: Number, default: 1 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "author" },
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const BookModel = mongoose.model("book", BookSchema);

module.exports = BookModel;

// Just for reference

// title (String, required)
// ISBN (String, unique, required)
// summary (String)
// publicationDate (Date)
// genres (Array of Strings)
// copiesAvailable (Number, default: 1)
// author (Author reference)
// borrowedBy (Array of User references)
