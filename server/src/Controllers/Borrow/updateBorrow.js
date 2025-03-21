const Book = require("../../Models/Book.model");
const User = require("../../Models/User.model");
const Borrow = require("../../Models/Borrow.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const updateBorrow = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      user,
      book,
      borrow_date,
      return_date,
      due_date,
      status
    } = req.body;

    const borrow = await Borrow.findOneAndUpdate(
      id,
      {
        user,
        book,
        borrow_date,
        return_date,
        due_date,
        status
      }, { new: true }
    );

    if (!borrow) {
      return failCode(res, null, "Không tìm thấy phiếu mượn");
    }
    return successCode(res, book, "Cập nhât phiếu mượn thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { updateBorrow };
