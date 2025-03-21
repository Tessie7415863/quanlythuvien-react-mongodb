const express = require("express");
const bookRoute = express.Router();
const { getBookById } = require("../../Controllers/Book/getBookById");

bookRoute.get("/get-book-by-id/:id", getBookById);

module.exports = bookRoute;
