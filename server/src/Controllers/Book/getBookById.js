const Book = require("../../Models/Book.model");
const { successCode, failCode, errorCode } = require("../../config/response");

const getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id)
    .populate("author", "name")
    .populate("subject", "name")
    .populate("department", "name")
    .populate("major", "name");
  if (!book) {
    return failCode(res, null, "Sách không tồn tại");
  }
  return successCode(res, book, "Lấy sách thành công");
};

module.exports = { getBookById };
