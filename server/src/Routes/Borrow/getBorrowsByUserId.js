const express = require("express");
const borrowRoute = express.Router();
const {
  getBorrowsByUserId,
} = require("../../Controllers/Borrow/getBorrowsByUserId");

borrowRoute.get("/get-borrows-by-user-id/:userId", getBorrowsByUserId);

module.exports = borrowRoute;
