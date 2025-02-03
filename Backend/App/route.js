const express = require("express");
const userRoute = require("./Routes/userRoute");
const wishlistRoute = require("./Routes/wishlistRoute");

const route = express.Router();

route.get("/", (req, res) => {
    res.send("api is working");
});
route.use("/user", userRoute);
route.use("/wishlist", wishlistRoute);

module.exports = route;