"use client";
import React, { createContext, useEffect, useState } from "react";

export const wishListContext = createContext();

function MainContext({ children }) {
  const [wishList, setWishList] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    localStorage.setItem("userId", userId);
    console.log(userId);
  }, [userId]);

  return (
    <wishListContext.Provider
      value={{ wishList, setWishList, userId, setUserId }}
    >
      {children}
    </wishListContext.Provider>
  );
}

export default MainContext;
