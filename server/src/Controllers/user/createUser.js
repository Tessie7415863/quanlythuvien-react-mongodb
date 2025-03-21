const User = require('../../Models/User.model');
const { failCode, successCode, errorCode } = require('../../config/response');
const createUser = async (req, res) => {
    try {
        const { first_name,
            last_name, email, pass_word, phone, gender } = req.body;
        const result = await User.findOne({ email: email });
        if (result) {
            failCode(res, "", "Email đã tồn tại!")
        }
        else {
            await User.create({
                first_name,
                last_name,
                email,
                pass_word: pass_word,
                phone,
                role: "user",
            });
            successCode(res, "", "Tạo tài khoản thành công!");
        }
    } catch (error) {
        errorCode(res, "Backend error")
    }
}
module.exports = { createUser }
