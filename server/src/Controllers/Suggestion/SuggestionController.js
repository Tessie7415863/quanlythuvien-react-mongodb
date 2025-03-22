const { failCode, successCode, errorCode } = require("../../config/response");
const Suggestion = require("../../Models/Suggestion.model");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth"); // Đọc file .docx

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Thư mục lưu file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /txt|docx/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (extName) {
      return cb(null, true);
    } else {
      return cb(new Error("Chỉ chấp nhận file .txt hoặc .docx"));
    }
  },
});
const getAllSuggestion = async (req, res) => {
  const { page = 1, limit = 10 } = req.params;
  try {
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const skip = (pageInt - 1) * limitInt;
    const result = await Suggestion.find()
      .skip(skip)
      .limit(limitInt)
      .populate("user", "username");
    const totalSuggestion = await Suggestion.countDocuments();
    const totalPages = Math.ceil(totalSuggestion / limitInt);
    if (result) {
      return successCode(
        res,
        { result, totalSuggestion, page: pageInt, totalPages: totalPages },
        "Lay danh sach suggestion thanh cong"
      );
    }
    return failCode(res, "", "danh sach suggestion trong");
  } catch (error) {
    return errorCode(error, "loi 500");
  }
};

const createSuggestion = async (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) return failCode(res, "", err.message);

    try {
      const { book, content, user } = req.body;
      const filePath = req.file ? req.file.path : null;
      let fileContent = "";

      if (filePath) {
        if (path.extname(filePath) === ".txt") {
          fileContent = fs.readFileSync(filePath, "utf-8");
        } else if (path.extname(filePath) === ".docx") {
          const result = await mammoth.extractRawText({ path: filePath });
          fileContent = result.value;
        }
      }

      const newSuggestion = await Suggestion.create({
        book,
        content,
        user,
        file: filePath, // Lưu đường dẫn file
        fileContent, // Lưu nội dung file
        status: "pending",
      });

      return successCode(res, newSuggestion, "Tạo suggestion thành công");
    } catch (error) {
      return errorCode(res, "Lỗi 500");
    }
  });
};
const updateSuggestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await Suggestion.findByIdAndUpdate(id, { status });
    if (result) {
      return successCode(res, result, "Cap nhat suggestion thanh cong");
    }
    return failCode(res, "", "Cap nhat suggestion that bai");
  } catch (error) {
    return errorCode(error, "loi 500");
  }
};

const deleteSuggestion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Suggestion.findByIdAndDelete(id);
    if (result) {
      return successCode(res, result, "Xoa suggestion thanh cong");
    }
    return failCode(res, "", "Xoa suggestion that bai");
  } catch (error) {
    return errorCode(error, "loi 500");
  }
};

module.exports = {
  getAllSuggestion,
  createSuggestion,
  updateSuggestion,
  deleteSuggestion,
};
