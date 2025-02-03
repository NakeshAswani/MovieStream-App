"use client";

// import { useWishlist } from "@/context/WishlistContext";
import { useContext } from "react";
import { wishListContext } from "../context/MainContext";

export default function Wishlist() {
  // const { wishlist, removeFromWishlist } = useWishlist();
  const { wishList, setWishList } = useContext(wishListContext);

  
  const removeWishlist = (id) => {
    setWishList((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <div>
      <h1>Your Wishlist</h1>
      {wishList.length === 0 ? (
        <p>No movies in wishlist</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {wishList.map((movie) => (
            <div key={movie.id} className="border p-4">
              <h2>{movie.title}</h2>
              <button
                className="bg-red-500 text-white px-4 py-2 mt-2"
                onClick={() => removeWishlist(movie.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
