const { failCode, successCode } = require('../../config/response');
const User = require('../../Models/User.model');

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, phone, role, password } = req.body;

        const result = await User.findOneAndUpdate(
            { _id: id },
            { first_name, last_name, email, phone, role, password },
            { new: true }
        );
        if (!result) {
            return failCode(res, "", "Người dùng không tồn tại!");
        } else {
            return successCode(res, result, "Cập nhật người dùng thành công!");
        }
    } catch (error) {
        return failCode(res, "Backend error !");
    }
};

module.exports = { updateUser }