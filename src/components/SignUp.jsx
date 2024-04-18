import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import login from "../store/authSlice";
import { useForm } from "react-hook-form";
import { Input, Button, Logo } from "./index";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");

    try {
      const userData = await authService.createAccount(data);

      if (userData) {
        console.log("User Data :", userData);

        dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.log("Signup error: ", error);
    }
  };

  const { register, handleSubmit } = useForm();

  return (
    <div className="flex items-center justify-center p-[7rem]">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="80%" className="justify-center" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              className="text-black"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label="Username"
              type="text"
              placeholder="Enter an username"
              className="text-black"
              {...register("username", {
                required: true,
              })}
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              className="text-black"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "Enter a valid email address please",
                },
              })}
            />

            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              className="text-black"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
