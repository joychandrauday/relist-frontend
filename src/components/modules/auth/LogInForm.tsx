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
import { useState } from "react";
import Image from "next/image";
import { loginUser } from "@/services/AuthService";
import { toast } from "sonner";

export default function LoginForm() {
    const form = useForm();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirectPath");
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsSubmitting(true);
        try {
            const res = await loginUser(data)
            console.log("Logged in user:", res);
            if (res.success) {
                toast.success('User log in Successfull!')
                window.location.reload()
                if (redirect) {
                    router.push(redirect);
                } else {
                    router.push("/");
                }
            } else {
                toast.error('Failed to log in. Please try again.')
            }
        } catch (err: any) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="border border-gray-300 rounded-xl flex-grow max-w-md w-full p-5 shadow-lg bg-white">
            <div className="flex items-center space-x-4 mb-4">
                <Image
                    src={'/relisticon.png'}
                    width={80}
                    height={80}
                    alt="relist logo"
                    className="object-contain"
                />
                <div>
                    <h1 className="text-xl font-semibold">Login</h1>
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
                                        value={field.value || ""}
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
                                        value={field.value || ""}
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
                Don't have an account?
                <Link href="/register" className="text-primary font-semibold ml-1">
                    Register
                </Link>
            </p>
        </div>
    );
}
