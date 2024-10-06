const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: { type: String },
  dateOfBirth: { type: Date },
  nationality: { type: String },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
});

const AuthorModel = mongoose.model("author", AuthorSchema);

module.exports = AuthorModel;

// Just for reference

// name (String, required)
// biography (String)
// dateOfBirth (Date)
// nationality (String)
// books (Array of Book references)
