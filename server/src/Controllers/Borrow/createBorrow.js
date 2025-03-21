const Book = require("../../Models/Book.model");
const User = require("../../Models/User.model");
const Borrow = require("../../Models/Borrow.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const createBorrow = async (req, res) => {
  try {
    const {
      user,
      book,
      borrow_date,
      return_date,
      due_date,
      status
    } = req.body;

    // Kiểm tra xem các trường có tồn tại trong database không
    const userExists = await User.findById(user);
    if (!userExists) return failCode(res, null, "Người dùng không tồn tại");

    const bookExists = await Book.findById(book);
    if (!bookExists) return failCode(res, null, "Sách không tồn tại");

    // Tạo sách mới nếu tất cả dữ liệu hợp lệ
    const borrow = await Borrow.create({
      user,
      book,
      borrow_date,
      return_date,
      due_date,
      status
    });

    return successCode(res, book, "Tạo phiếu mượn thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { createBorrow };
