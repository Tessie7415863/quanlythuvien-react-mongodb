//   src/routes/index.js file này sẽ quản lý tất cả các Router
const express = require("express");
const rootRoute = express.Router();
//auth
const signUp = require("./Auth/signUp");
const login = require("./Auth/login");

//user
const getAllUsers = require("./user/getAllUsers");
const getUserById = require("./user/getUserById");
const createUser = require("./user/createUser");
const updateUser = require("./user/updateUser");
const deleteUser = require("./user/deleteUser");

//author
const createAuthor = require("./Author/createAuthor");
const getAllAuthors = require("./Author/getAllAuthors");
const updateAuthors = require("./Author/updateAuthor");
const deleteAuthors = require("./Author/deleteAuthor");

//departmernt
const createDepartment = require("./Department/createDepartment");
const getAllDepartments = require("./Department/getAllDepartments");
const updateDepartments = require("./Department/updateDepartment");
const deleteDepartments = require("./Department/deleteDepartment");

//Major
const createMajor = require("./Major/createMajor");
const getAllMajors = require("./Major/getAllMajors");
const updateMajors = require("./Major/updateMajor");
const deleteMajors = require("./Major/deleteMajor");

//Subject
const createSubject = require("./Subject/createSubject");
const getAllSubjects = require("./Subject/getAllSubjects");
const updateSubjects = require("./Subject/updateSubject");
const deleteSubjects = require("./Subject/deleteSubject");

//books
const createBook = require("./Book/createBook");
const getAllBooks = require("./Book/getAllBooks");
const updateBooks = require("./Book/updateBook");
const deleteBooks = require("./Book/deleteBook");
const getBookById = require("./Book/getBookById");

//Borrow
const createBorrow = require("./Borrow/createBorrow");
const updateBorrow = require("./Borrow/updateBorrow");
const deleteBorrow = require("./Borrow/deleteBorrow");
const getAllBorrows = require("./Borrow/getAllBorrows");
const getBorrowsByUserId = require("./Borrow/getBorrowsByUserId");

//suggestions
const getSuggestions = require("./Suggestion/SuggestionController");
const createSuggestion = require("./Suggestion/SuggestionController");
const updateSuggestion = require("./Suggestion/SuggestionController");
const deleteSuggestion = require("./Suggestion/SuggestionController");

//auth
rootRoute.use("/auth", signUp);
rootRoute.use("/auth", login);

rootRoute.use("/users", getAllUsers);
rootRoute.use("/users", getUserById);
rootRoute.use("/users", createUser);
rootRoute.use("/users", updateUser);
rootRoute.use("/users", deleteUser);

//author
rootRoute.use("/author", createAuthor);
rootRoute.use("/author", getAllAuthors);
rootRoute.use("/author", updateAuthors);
rootRoute.use("/author", deleteAuthors);

// department
rootRoute.use("/department", createDepartment);
rootRoute.use("/department", getAllDepartments);
rootRoute.use("/department", updateDepartments);
rootRoute.use("/department", deleteDepartments);

//MAJOR
rootRoute.use("/major", createMajor);
rootRoute.use("/major", getAllMajors);
rootRoute.use("/major", updateMajors);
rootRoute.use("/major", deleteMajors);

//Subject
rootRoute.use("/subject", createSubject);
rootRoute.use("/subject", getAllSubjects);
rootRoute.use("/subject", updateSubjects);
rootRoute.use("/subject", deleteSubjects);

//Book
rootRoute.use("/book", createBook);
rootRoute.use("/book", getAllBooks);
rootRoute.use("/book", updateBooks);
rootRoute.use("/book", deleteBooks);
rootRoute.use("/book", getBookById);
//Borrow
rootRoute.use("/borrow", createBorrow);
rootRoute.use("/borrow", updateBorrow);
rootRoute.use("/borrow", deleteBorrow);
rootRoute.use("/borrow", getAllBorrows);
rootRoute.use("/borrow", getBorrowsByUserId);

//suggestions
rootRoute.use("/suggestions", getSuggestions);
rootRoute.use("/suggestions", createSuggestion);
rootRoute.use("/suggestions", updateSuggestion);
rootRoute.use("/suggestions", deleteSuggestion);
//nhớ export
module.exports = rootRoute;
