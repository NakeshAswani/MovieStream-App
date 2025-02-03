const express = require("express");
const { addWishlist, getWishlist, deleteWishlist } = require("../Controllers/wishlistController");

const wishlistRoute = express.Router();

wishlistRoute.post("/addWishlist", addWishlist);
wishlistRoute.get("/getWishlist/:id", getWishlist);
wishlistRoute.delete("/deleteWishlist/:id", deleteWishlist);

module.exports = wishlistRoute;