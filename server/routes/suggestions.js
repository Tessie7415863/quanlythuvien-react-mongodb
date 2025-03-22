const express = require("express");
const router = express.Router();

let suggestions = []; // Dữ liệu tạm thời, bạn có thể thay bằng cơ sở dữ liệu

// Lấy danh sách đề xuất
router.get("/", (req, res) => {
    res.json(suggestions);
});

// Thêm đề xuất mới
router.post("/", (req, res) => {
    const { bookName, description } = req.body;
    if (!bookName || !description) {
        return res.status(400).json({ message: "Thiếu thông tin đề xuất." });
    }
    suggestions.push({ bookName, description });
    res.status(201).json({ message: "Đề xuất đã được thêm thành công." });
});

module.exports = router;
