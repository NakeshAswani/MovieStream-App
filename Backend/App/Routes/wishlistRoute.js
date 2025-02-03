const express = require("express");
// const multer = require("multer");
const { addWishlist, getWishlist, deleteWishlist } = require("../Controllers/wishlistController");

const wishlistRoute = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/wishlist')
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().getTime() + file.originalname);
//     }
// })

// const upload = multer({ storage: storage });

// wishlistRoute.post("/addWishlist", upload.single("Pimage"), addWishlist);
wishlistRoute.post("/addWishlist", addWishlist);
wishlistRoute.get("/getWishlist/:id", getWishlist);
wishlistRoute.delete("/deleteWishlist/:id", deleteWishlist);

module.exports = wishlistRoute;