/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // Socket.IO server URL
export type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const { theme } = useTheme();
  const { data: session } = useSession(); // Get the current session data
  const [userEmail, setUserEmail] = useState<string | null>(null); // Store the user email for socket operations

  useEffect(() => {
    if (session?.user?.id) {
      // Emit userLoggedIn event once the user is logged in
      socket.emit("userLoggedIn", session?.user?.id);
      setUserEmail(session.user.id);
      console.log('yess');
    }

    // Cleanup: Emit logout event when the user disconnects or logs out
    return () => {
      if (userEmail) {
        socket.emit("logout", userEmail);
      }
    };
  }, [session?.user?.email, session?.user?.id, userEmail]); // Listen for session updates

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await signIn("credentials", {
        redirect: false, // Prevent auto-redirect
        ...data, // Pass the credentials (email, password)
      });

      console.log(res);
      if (res?.error) {
        toast.error("Login failed. Please check your credentials.");
      } else {
        toast.success("User login successful!");
        // Now the socket will be notified via the useEffect hook when the session is available
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md mt-12 p-8 rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/30 shadow-lg border border-gray-200 dark:border-gray-700">
        <Image
          src={"/relisticon.png"}
          width={80}
          height={80}
          alt="relist logo"
          className="object-contain mx-auto mb-4"
        />
        <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-gray-100">Login</h1>

        {/* Back to Home Button */}
        <div className="text-center mt-4">
          <Link href="/" className="text-teal-500 hover:underline">
            &larr; Back to Home
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="mb-4">
            <label className="block text-sm text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full mt-1 px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-gray-100"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full mt-1 px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-gray-100"
              placeholder="Enter your password"
            />
            <p className="text-sm opacity-30 pt-2">for google or github sign-in users default password is &quot;password&quot;</p>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 focus:ring-2 focus:ring-teal-400"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-teal-500 hover:underline">
            Sign up
          </Link>
        </p>

        <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">Or continue with</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/register" })}
            className="flex items-center justify-center w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            <FaGoogle />
          </button>
          <button
            onClick={() => signIn("github", { callbackUrl: "/register" })}
            className="flex items-center justify-center w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
