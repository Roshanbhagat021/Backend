const mongoose = require("mongoose");

const BorrowedBooksSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "book", required: true },
  member: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  borrowDate: { type: Date, default: Date.now() },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status:{type:String, enum: ['Borrowed', 'Returned'], default: 'Borrowed'}
});

const BorrowedBookModel = mongoose.model("borrowed_book", BorrowedBooksSchema);

module.exports = BorrowedBookModel;

// Just for reference

// book (Book reference, required)
// member (User reference, required)
// borrowDate (Date, default: Date.now)
// dueDate (Date, required)
// returnDate (Date)
// status (String, enum: ['Borrowed', 'Returned'], default: 'Borrowed')
