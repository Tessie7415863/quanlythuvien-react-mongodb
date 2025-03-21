const { successCode } = require("../../config/response");
const Borrow = require("../../Models/Borrow.model");
const getBorrowsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const borrows = await Borrow.find({ user: userId })
      .populate("book", "title") // Populate để lấy tên sách
      .sort({ borrow_date: -1 }); // Sắp xếp theo ngày mượn mới nhất

    if (!borrows.length) {
      return failCode(res, [], "Không có lịch sử mượn");
    }

    return successCode(res, borrows, "Lấy lịch sử mượn thành công");
  } catch (error) {
    return failCode(res, null, "Lỗi lấy dữ liệu mượn");
  }
};

module.exports = { getBorrowsByUserId };
