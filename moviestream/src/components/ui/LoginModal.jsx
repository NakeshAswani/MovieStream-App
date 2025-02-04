"use client";
import { useContext, useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { wishListContext } from "@/app/context/MainContext";
import Swal from "sweetalert2";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginModal({ isOpen, onClose }) {
  const { userId, setUserId } = useContext(wishListContext);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    else{
      form.reset();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function onSubmit(values) {
    await axios
      .post(
        `https://movie-stream-app-backend.vercel.app/user/loginUser`,
        values
      )
      .then((res) => {
        // console.log(res);
        setUserId(res.data.data.user.id);
        onClose();
        Swal.fire({
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
        });
      });
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50   z-50">
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative"
          // onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={onClose}
          >
            ✖
          </button>
          <h1 className="text-2xl font-bold text-center">
            Sign in to your account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?
            <a className="text-blue-500 hover:text-blue-700" href="#">
              Create a free account
            </a>
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8"
              method="POST"
              action="#"
            >
              <div className="space-y-5">
                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />   
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center justify-end">
                  <a
                    className="text-sm font-semibold text-black hover:underline"
                    href="/forget-password"
                  >
                    Forgot password?
                  </a>
                </div>
                <div>
                  <Button className="w-full" type="submit">
                    Get started
                  </Button>
                </div>
              </div>
            </form>
          </Form>
          <div className="mt-3 space-y-3">
            <Button type="button" className="w-full">
              <span className="mr-2 inline-block">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-rose-500"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </span>
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
