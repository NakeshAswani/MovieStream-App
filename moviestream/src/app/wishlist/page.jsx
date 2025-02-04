"use client";

import { useContext, useEffect } from "react";
import { wishListContext } from "../context/MainContext";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Swal from "sweetalert2";

export default function Wishlist() {
  const { wishList, setWishList, userId } = useContext(wishListContext);

  const getWish = async () => {
    try {
      const res = await axios.get(
        `https://movie-stream-app-backend.vercel.app/wishlist/getWishlist/${userId}`
      );
      if (res.data.wishlistData) {
        setWishList(res.data.wishlistData);
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  const removeWishlist = async (id) => {
    try {
      await axios.delete(
        `https://movie-stream-app-backend.vercel.app/wishlist/deleteWishlist/${id}`
      );
      Swal.fire({
        icon: "success",
        title: "Removed from wishlist",
        showConfirmButton: false,
        timer: 1000,
      });

      setWishList((prev) => prev.filter((movie) => movie.Wid !== id));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      getWish();
    }
  }, [userId]);

  return (
    <div>
      <div className="text-black text-center py-6">
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
      </div>

      <div className="bg-[#e6eaf8] min-h-screen flex justify-center items-center py-10 px-4">
        {wishList.length === 0 ? (
          <p className="text-2xl font-semibold">Your wishlist is empty.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
            {wishList.map((movie) => (
              <div
                key={movie.Wid}
                className="bg-gray-100 text-black p-4 rounded-lg shadow-lg w-full max-w-sm transform transition hover:scale-105"
              >
                {/* Movie Poster & Remove Wishlist Button */}
                <div className="relative w-full">
                  <img
                    src={movie.Pimage}
                    alt={movie.Pname}
                    className="rounded-lg object-cover w-full h-auto"
                  />
                  <button
                    className="absolute top-3 right-3 bg-black/60 p-2 rounded-full text-white hover:text-[#FAC748] transition"
                    onClick={() => removeWishlist(movie.Wid)}
                  >
                    <Heart
                      fill={
                        wishList.some((item) => item.Wid === movie.Wid)
                          ? "#FAC748"
                          : "transparent"
                      }
                      stroke="white"
                    />
                  </button>
                </div>

                {/* Movie Details */}
                <div className="mt-4 space-y-2">
                  <h2 className="text-xl font-semibold">{movie.Pname}</h2>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {movie.Pdesc}
                  </p>

                  {/* Watch Now Button */}
                  <Button className="w-full bg-[#FAC748] text-black font-semibold py-2 rounded-md hover:bg-[#f5b72d] transition">
                    Watch Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
