"use client";
import React, { createContext, useEffect, useState } from "react";

export const wishListContext = createContext();

function MainContext({ children }) {
  const [content, setContent] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }, [userId]);

  return (
    <wishListContext.Provider
      value={{ content, setContent, wishList, setWishList, userId, setUserId }}
    >
      {children}
    </wishListContext.Provider>
  );
}

export default MainContext;
