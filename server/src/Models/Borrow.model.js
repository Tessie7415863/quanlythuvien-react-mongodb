const mongoose = require("mongoose");
const { Schema } = mongoose;

const BorrowSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  borrow_date: {
    type: String,
    required: true,
  },
  return_date: {
    type: String,
    required: true,
  },
  due_date: {
    type: String,
  },
  status: {
    type: String,
    enum: ["borrowed", "returned", "late"],
    default: "borrowed",
  },
});
const Borrow = mongoose.model("Borrow", BorrowSchema);
module.exports = Borrow;
