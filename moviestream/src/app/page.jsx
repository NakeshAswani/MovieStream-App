"use client";

import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import axios from "axios";
import { useWishlist, wishListContext } from "./context/MainContext";

export default function HomePage() {
  const [isWishlisted, setIsWishlisted] = useState({});
  const [data, setData] = useState(null);

  const {wishList, setWishList} = useContext(wishListContext);

  const addWishlist = (movie) => {
    setWishList((prev) => {
      const isMovieExist = prev.some((item) => item.id === movie.id);
      if (!isMovieExist) {
        return [...prev, movie];
      }
      return prev;
    });
  };


  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
      )
      .then((response) => setData(response.data.results))
      .catch((error) => console.error("Error:", error));
  }, []);

  console.log("Before", data);

  // console.log("BEfore  isWishlisted", isWishlisted);

  const toggleWishlist = (title) => {
    setIsWishlisted((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // console.log("After  isWishlisted", isWishlisted);

  return (
    <>
      <div className="bg-[#e6eaf8] min-h-screen flex justify-center items-center py-10 px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
          {data &&
            data.map((movie) => (
              <div
                key={movie.title}
                className="bg-gray-100 text-black p-4 rounded-lg shadow-lg w-full max-w-sm transform transition hover:scale-105"
              >
                <div className="relative w-full ">
                  <img
                    key={movie.id}
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
                    onClick={() => {
                      toggleWishlist(movie.title)
                      addWishlist(movie);
                    }}
                  >
                    <Heart
                      fill={
                        isWishlisted[movie.title] ? "#FAC748" : "transparent"
                      }
                      stroke="white"
                    />
                  </button>
                </div>

                <div className="mt-4 space-y-2">
                  <h2 className="text-xl font-semibold">{movie.title}</h2>

                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5"
                        fill={i < movie.rating ? "#FAC748" : "gray"}
                        stroke="gray"
                      />
                    ))}
                    <span className="ml-2 text-sm">{} / 5</span>
                  </div>
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
    </>
  );
}
