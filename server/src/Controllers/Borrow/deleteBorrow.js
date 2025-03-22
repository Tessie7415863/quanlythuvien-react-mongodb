const Book = require("../../Models/Book.model");
const User = require("../../Models/User.model");
const Borrow = require("../../Models/Borrow.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const deleteBorrow = async (req, res) => {
  try {
    const { id } = req.query;
    const borrow = await Borrow.findByIdAndDelete(id);
    if (!borrow) {
      return failCode(res, null, "Không tìm thấy phiếu mượn");
    }
    return successCode(res, borrow, "Xóa phiếu mượn thành công");
  } catch (error) {
    return errorCode(res, "Lỗi 500");
  }
};

module.exports = { deleteBorrow };
