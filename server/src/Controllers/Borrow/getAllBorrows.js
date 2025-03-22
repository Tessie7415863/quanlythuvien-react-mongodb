const Borrow = require("../../Models/Borrow.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const getAllBorrows = async (req, res) => {
  const {
    keyword,
    order = "asc",
    sortby = "id",
    page = 1,
    limit = 10,
  } = req.params;
  const { id } = req.params;
  try {
    if (id) {
      const borrow = await Borrow.findOne(id).populate("user", "book");
      if (!borrow) {
        return failCode(res, null, "Không tìm thấy phiếu mượn");
      }
      return successCode(res, borrow, "Lấy dữ liệu phiếu mượn thành công");
    }
    // lọc theo keyword ?keyword=
    const filter = keyword
      ? { user: { $regex: new RegExp(keyword, "i") } }
      : {};
    // sắp xếp theo sortBy ?sortBy=
    // sắp xếp theo order ?order=
    const sortOrder = order === "desc" ? -1 : 1;

    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);

    const skip = (pageInt - 1) * limitInt;

    const result = await Borrow.find(filter)
      .sort({ [sortby]: sortOrder })
      .skip(skip)
      .limit(limitInt)
      .populate("user", "book");
    //Đếm tổng số phiếu mượn
    const totalBorrows = await Borrow.countDocuments(filter);
    //Tính tổng số trang
    const totalPages = Math.ceil(totalBorrows / limitInt);
    if (result) {
      return successCode(
        res,
        { result, totalBorrows, page: pageInt, totalPages: totalPages },
        "Lấy danh sách phiếu mượn thành công"
      );
    }
    return failCode(res, "", "Danh sách phiếu mượn trống");
  } catch (error) {
    return errorCode(error, "Lỗi 500");
  }
};

module.exports = { getAllBorrows };
