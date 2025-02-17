const express = require('express');
const userRoute = express.Router();

const { updateUser } = require('../../Controllers/User/updateUser')
userRoute.put('/update-user/:id', updateUser);

module.exports = userRoute;


