const express = require("express");
const borrowRoute = express.Router();
const { updateBorrow } = require("../../Controllers/Borrow/updateBorrow");
const { verifyToken } = require('../../Middleware/baseToken');
borrowRoute.put("/update-borrow", verifyToken, updateBorrow);

module.exports = borrowRoute;
