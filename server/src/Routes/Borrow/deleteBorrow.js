const express = require("express");
const borrowRoute = express.Router();
const { deleteBorrow } = require("../../Controllers/Borrow/deleteBorrow");
const { verifyToken } = require('../../Middleware/baseToken');

// borrowRoute.delete("/delete-borrow", verifyToken, deleteBorrow);
borrowRoute.delete("/delete-borrow", deleteBorrow);

module.exports = borrowRoute;
