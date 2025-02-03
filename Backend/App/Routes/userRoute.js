const express = require("express");
const { addUser, getUser, loginUser, deleteUser, forgotPassword } = require("../Controllers/userController");

const userRoute = express.Router();

userRoute.post("/addUser/:id?", addUser);
userRoute.post("/forgotPassword", forgotPassword);
userRoute.post("/loginUser", loginUser);
userRoute.get("/getUser/:id", getUser);
userRoute.delete("/deleteUser/:id", deleteUser);

module.exports = userRoute;