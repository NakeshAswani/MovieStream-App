"use client";
import React, { createContext, useState } from "react";

export const wishListContext = createContext();

function MainContext({ children }) {
  const [wishList, setWishList] = useState([]);

 

 
  return (
    <wishListContext.Provider value={{ wishList, setWishList }}>
      {children}
    </wishListContext.Provider>
  );
}


export default MainContext;
