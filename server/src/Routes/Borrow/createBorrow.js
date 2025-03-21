const express = require("express");
const borrowRoute = express.Router();
const { createBorrow } = require("../../Controllers/Borrow/createBorrow");
const { verifyToken } = require("../../Middleware/baseToken");

// borrowRoute.post("/create-borrow", verifyToken, createBorrow);
borrowRoute.post("/create-borrow", createBorrow);

module.exports = borrowRoute;
