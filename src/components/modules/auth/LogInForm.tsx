"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // 🔹 সার্ভারের WebSocket URL

export default function LoginForm() {
    const form = useForm();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirectPath");
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        if (userEmail) {
            socket.emit("login", userEmail);
        }

        return () => {
            if (userEmail) {
                socket.emit("logout", userEmail);
            }
        };
    }, [userEmail]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsSubmitting(true);
        try {
            const result = await signIn("credentials", {
                ...data,
                redirect: false,
            });
            console.log(data);
            if (result?.error) {
                toast.error("Login failed. Please check your credentials.");
            } else {
                toast.success("User login successful!");
                setUserEmail(data.user._id);

                // if (redirect) {
                //     router.push(redirect);
                // } else {
                //     router.push("/");
                // }
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="border border-gray-300 rounded-xl flex-grow max-w-md w-full p-5 shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
                <Image
                    src={"/relisticon.png"}
                    width={80}
                    height={80}
                    alt="relist logo"
                    className="object-contain"
                />
                <div>
                    <h1 className="text-xl font-semibold">Loginnnn</h1>
                    <p className="font-light text-sm text-gray-600">Welcome back!</p>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Login Button */}
                    <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Form>

            {/* Register Link */}
            <p className="text-sm text-gray-600 text-center mt-3">
                Don&apos;t have an account?
                <Link href="/register" className="text-primary font-semibold ml-1">
                    Register
                </Link>
            </p>
        </div>
    );
}
