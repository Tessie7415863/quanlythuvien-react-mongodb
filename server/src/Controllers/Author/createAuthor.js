const { successCode, errorCode } = require("../../config/response");
const Author = require("../../Models/Author.model");

const createAuthor = async (req, res) => {
  try {
    const { name, bio, date_of_birth, date_of_death } = req.body;
    const author = await Author.create({
      name,
      bio,
      date_of_birth,
      date_of_death,
    });
    return successCode(res, author, "Tạo tác giả thành công");
  } catch (error) {
    return errorCode(error, "Lỗi 500");
  }
};

module.exports = { createAuthor };
