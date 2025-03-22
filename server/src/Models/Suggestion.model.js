const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SuggestionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    file: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Suggestion = mongoose.model("Suggestion", SuggestionSchema);
module.exports = Suggestion;
