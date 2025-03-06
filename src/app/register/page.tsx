/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { registerUser } from "@/utils/actions/registerUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type UserData = {
  username: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<UserData>();
  const router = useRouter();

  const onSubmit = async (data: UserData) => {
    try {
      const res = await registerUser(data);
      if (res.success) {
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center mt-6 ">
      <div className="w-full max-w-md p-8 border-4  rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              {...register("username")}
              placeholder="User Name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white font-semibold py-2 rounded shadow-md transition duration-300 hover:bg-teal-600"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-teal-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
