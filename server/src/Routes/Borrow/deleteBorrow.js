const express = require("express");
const borrowRoute = express.Router();
const { deleteBorrow } = require("../../Controllers/Borrow/deleteBorrow");
const { verifyToken } = require('../../Middleware/baseToken');

borrowRoute.delete("/delete-borrow", verifyToken, deleteBorrow);

module.exports = borrowRoute;
