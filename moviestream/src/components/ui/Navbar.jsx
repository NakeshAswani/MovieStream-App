"use client";

import { React, useContext, useEffect, useState } from "react";
import { Button } from "./button";
import {
  Command,
  CommandList,
  CommandInput,
  CommandSeparator,
} from "@/components/ui/command";
import { Menu, X } from "lucide-react";
import LoginModal from "./LoginModal";
import { usePathname } from "next/navigation";
import Link from "next/link";
import RegisterModal from "./RegisterModal";
import Swal from "sweetalert2";
import { wishListContext } from "@/app/context/MainContext";
import axios from "axios";

function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { setContent, userId } = useContext(wishListContext);
  const pathname = usePathname();

  const logOut = () => {
    if (typeof window !== "undefined") {
      // Only run this in the browser
      localStorage.removeItem("userId");
    }
    Swal.fire({
      icon: "success",
      title: "Logout Successfully",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const handleInput = async (e) => {
    if (e !== undefined) {
      await axios.get(`https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&query=${e}`)
        .then((res) => setContent(res.data.results))
        .catch((err) => console.log(err))
    }
    else {
      await axios.get("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1")
        .then((res) => setContent(res.data.results))
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    handleInput()
  }, [])

  return (
    <>
      <div className="bg-[#1D2F6F]">
        <nav className="flex justify-between items-center p-4 h-16 relative">
          <div className="p-2 md:ml-10">
            <img
              src="/images/logo.svg"
              alt="logo"
              className="w-36 h-auto md:w-52"
            />
          </div>

          <div className="hidden md:block">
            <Command >
              <CommandInput placeholder="Type a command or search..." onValueChange={(e) => handleInput(e)} />
              <CommandList>
                <CommandSeparator />
              </CommandList>
            </Command>
          </div>
          <div className="hidden md:flex justify-between items-center space-x-6 mr-10 font-medium text-white">
            <ul className="flex justify-center space-x-6">
              {["Home", "Subscription", "Wishlist"].map((text) => {
                const path = text === "Home" ? "/" : `/${text.toLowerCase()}`;
                const isActive = pathname === path; // Checks if the current route matches

                return (
                  <li key={text}>
                    <Link
                      href={path}
                      className={`hover:text-[#FAC748] transition-colors ${isActive ? "text-[#FAC748] font-bold" : "text-white"
                        }`}
                    >
                      {text}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="p-2 space-x-4 flex text-black">
              {userId !== null ? (
                <Button
                  variant="outline"
                  className="hover:bg-[#FAC748]"
                  onClick={() => logOut()}
                >
                  Log Out
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="hover:bg-[#FAC748]"
                    onClick={() => {
                      // console.log("Opening Login Modal");
                      setIsLoginModalOpen(true);
                    }}
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => setIsRegisterModalOpen(true)}
                    variant="outline"
                    className="hover:bg-[#FAC748]"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>

          <button
            className="md:hidden text-white focus:outline-none mr-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <div
            className={`fixed top-0 right-0 h-full bg-[#1D2F6F] text-white w-64 transform ${isOpen ? "translate-x-0" : "translate-x-full"
              } transition-transform duration-300 ease-in-out shadow-lg z-10`}
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setIsOpen(false)} className="text-white">
                <X size={28} />
              </button>
            </div>

            <ul className="flex flex-col items-center space-y-6 mt-4 font-medium">
              {["Home", "Subscription", "Wishlist"].map((text) => {
                const path = text === "Home" ? "/" : `/${text.toLowerCase()}`;
                // console.log("path", path);

                const isActive = pathname === path;

                // console.log("isActive", isActive);

                return (
                  <li key={text}>
                    <Link
                      href={path}
                      className={`hover:text-[#FAC748] transition-colors ${isActive ? "text-[#FAC748] font-bold" : "text-white"
                        }`}
                    >
                      {text}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-col items-center mt-8 space-y-3 text-black">
              <Button
                variant="outline"
                className="hover:bg-[#FAC748]"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Log In
              </Button>
              <Button
                variant="outline"
                className="hover:bg-[#FAC748]"
                onClick={() => setIsRegisterModalOpen(true)}
              >
                Register
              </Button>
            </div>
          </div>
        </nav>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => {
            // console.log("Closing Login Modal");
            setIsLoginModalOpen(false);
          }}
        />
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => {
            // console.log("Closing Register Modal");
            setIsRegisterModalOpen(false);
          }}
        />
      </div>
    </>
  );
}

export default Navbar;
