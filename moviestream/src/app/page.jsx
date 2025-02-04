"use client";

import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import axios from "axios";
import { wishListContext } from "./context/MainContext";
import Swal from "sweetalert2";

export default function HomePage() {
  const [isWishlisted, setIsWishlisted] = useState({});
  const { content, userId } = useContext(wishListContext);

  const addWishlist = async (Pid, Pname, Pdesc, Pimage) => {
    let obj = {
      Pid,
      Pname,
      Pdesc,
      Pimage: "https://image.tmdb.org/t/p/w500" + Pimage,
      Uid: userId,
    };

    try {
      await axios.post(
        "https://movie-stream-app-backend.vercel.app/wishlist/addWishlist",
        obj
      );
      Swal.fire({
        icon: "success",
        title: "Added to wishlist",
        showConfirmButton: false,
        timer: 1000,
      });

      // Update the local state to reflect the change
      setIsWishlisted((prev) => ({ ...prev, [Pid]: true }));
    } catch (error) {
      console.error(error);
    }
  };

  const getWishlist = async () => {
    try {
      const res = await axios.get(
        `https://movie-stream-app-backend.vercel.app/wishlist/getWishlist/${userId}`
      );

      // Transform wishlistData into an object where Pid is the key
      const wishlistMap = {};
      res.data.wishlistData.forEach((item) => {
        wishlistMap[item.Pid] = true;
      });

      setIsWishlisted(wishlistMap);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className="bg-[#e6eaf8] min-h-screen flex justify-center items-center py-10 px-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
        {content &&
          content.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-100 text-black p-4 rounded-lg shadow-lg w-full max-w-sm transform transition hover:scale-105"
            >
              <div className="relative w-full">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                  }
                  alt={movie.title}
                  className="rounded-lg object-cover w-full h-auto"
                />
                <button
                  className="absolute top-3 right-3 bg-black/60 p-2 rounded-full text-white hover:text-[#FAC748] transition"
                  onClick={() =>
                    addWishlist(
                      movie.id,
                      movie.title,
                      movie.overview,
                      movie.poster_path
                    )
                  }
                >
                  <Heart
                    fill={isWishlisted[movie.id] ? "#FAC748" : "transparent"}
                    stroke="white"
                  />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <h2 className="text-xl font-semibold">{movie.title}</h2>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {movie.overview}
                </p>
                <Button className="w-full bg-[#FAC748] text-black font-semibold py-2 rounded-md hover:bg-[#f5b72d] transition">
                  Watch Now
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
