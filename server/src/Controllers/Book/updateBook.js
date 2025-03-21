const Book = require("../../Models/Book.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const updateBook = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params
    const {
      title,
      description,
      published_date,
      isbn,
      author,
      major,
      subject,
      department,
      image,
    } = req.body; // Lấy dữ liệu cần cập nhật
    const book = await Book.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
        published_date,
        isbn,
        author,
        major,
        subject,
        department,
        image,
      },
      { new: true }
    );
    if (!book) {
      return failCode(res, null, "Không tìm thấy sách");
    }
    return successCode(res, book, "Cập nhật sách thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { updateBook };
