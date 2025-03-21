const { successCode, failCode, errorCode } = require("../../config/response");
const User = require('../../Models/User.model')
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await User.findOneAndDelete({ _id: id });
        if (!result) {
            return failCode(res, "", 'Người dùng không tồn tại!');
        } else {
            return successCode(res, result, "Xoá người dùng thành công!");
        }
    } catch (error) {
        return errorCode(res, "Backend error !");
    }
};

module.exports = {
    deleteUser,
};
