const Book = require("../../Models/Book.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ params

    const book = await Book.findByIdAndDelete(id); // Xóa sách theo ID

    if (!book) {
      return failCode(res, null, "Không tìm thấy sách để xóa");
    }

    return successCode(res, book, "Xóa sách thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { deleteBook };
