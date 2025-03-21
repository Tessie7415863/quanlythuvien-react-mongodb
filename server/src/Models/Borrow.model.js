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
        type: Date,
        required: true,
    },
    return_date: {
        type: Date,
        required: true,
    },
    due_date: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["borrowed", "returned", "late"],
        default: "borrowed",
    },
})
module.exports = mongoose.model("Borrow", BorrowSchema);