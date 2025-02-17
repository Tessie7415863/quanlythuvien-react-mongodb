const express = require('express');
const userRoute = express.Router();

const { deleteUser } = require('../../Controllers/User/deleteUser')
userRoute.delete('/delete-user/:id', deleteUser);

module.exports = userRoute;


