const express = require("express");
const router = express.Router();

let suggestions = []; // Lưu trữ tạm thời trong bộ nhớ

// API để thêm đề xuất sách
router.post("/api/suggestions", (req, res) => {
    const { bookName, description } = req.body;
    if (!bookName || !description) {
        console.error("Invalid data received:", req.body);
        return res.status(400).json({ message: "Thiếu thông tin." });
    }
    suggestions.push({ bookName, description });
    console.log("New suggestion added:", { bookName, description });
    res.status(201).json({ message: "Đề xuất đã được thêm." });
});

// API để lấy danh sách đề xuất sách
router.get("/api/suggestions", (req, res) => {
    res.json(suggestions);
});

module.exports = router;
