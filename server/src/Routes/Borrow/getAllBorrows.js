const express = require("express");
const borrowRoute = express.Router();
const { getAllBorrows } = require("../../Controllers/Borrow/getAllBorrows");
// const { verifyToken } = require('../../Middleware/baseToken');
borrowRoute.get("/get-all-borrows", getAllBorrows);

module.exports = borrowRoute;
