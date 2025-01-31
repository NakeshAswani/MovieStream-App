const express = require("express");
const { addUsers, getUser, delUser, loginUser } = require("../Controllers/user_controller");

const userRoute = express.Router();

userRoute.post('/add-user/:id?', addUsers);
userRoute.post('/login-user/:google', loginUser);
userRoute.get('/get-user/:id', getUser);
userRoute.delete('/del-user/:id', delUser);


module.exports = userRoute;