"use client";
import { useEffect } from "react";

export default function LoginModal({ isOpen, onClose }) {
  // Close modal when clicking outside (optional)
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    // return () => {
    //   document.removeEventListener("keydown", handleEscape);
    // };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ✖
        </button>
        <h1 className="text-2xl font-bold text-center">Sign in to your account</h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?
          <a
            className="text-blue-500 hover:text-blue-700"
            href="#"
          >
            Create a free account
          </a>
        </p>
        <form className="mt-8" method="POST" action="#">
          <div className="space-y-5">
            <div>
              <label className="text-base font-medium text-gray-900">Email address</label>
              <div className="mt-2">
                <input
                  placeholder="Email"
                  type="email"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-900">Password</label>
                <a
                  className="text-sm font-semibold text-black hover:underline"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>
              <div className="mt-2">
                <input
                  placeholder="Password"
                  type="password"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <button
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                type="button"
              >
                Get started
              </button>
            </div>
          </div>
        </form>
        <div className="mt-3 space-y-3">
          <button
            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            type="button"
          >
            <span className="mr-2 inline-block">
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-rose-500"
              >
                <path
                  d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                ></path>
              </svg>
            </span>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
);
}
