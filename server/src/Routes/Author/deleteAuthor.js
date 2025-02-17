const express = require("express");
const authorRoute = express.Router();
const { deleteAuthor } = require("../../Controllers/Author/deleteAuthor");

authorRoute.delete("/delete-author/:id", deleteAuthor); //khi sử dụng id truyền vào param (là cái mình điền URL vào trong postman)

module.exports = authorRoute;
