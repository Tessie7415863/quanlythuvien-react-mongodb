const Department = require("../../Models/Department.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params
    const { name, description } = req.body; // Lấy dữ liệu cần cập nhật
    const department = await Department.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
      },
      { new: true }
    );

    if (!department) {
      return failCode(res, null, "Không tìm thấy khoa");
    }
    return successCode(res, department, "Cập nhật khoa thành công");
  } catch (error) {
    return errorCode(res, error, "Lỗi 500");
  }
};

module.exports = { updateDepartment };
