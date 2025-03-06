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
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";

export default function RegisterForm() {
    const form = useForm();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsSubmitting(true);
        try {
            const res = await registerUser(data)
            if (res.success) {
                toast.success('User Registration Success!')
                router.push("/login");
            }
        } catch (err) {
            if (err instanceof Error) {
                toast.error(`Failed to verify order. ${err.message}`);
            } else {
                toast.error("Failed to verify order. An unknown error occurred.");
            }
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
                    <h1 className="text-xl font-semibold">Register</h1>
                    <p className="font-light text-sm text-gray-600">Create your account</p>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter your name"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                                        placeholder="Create a password"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Register Button */}
                    <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Creating account..." : "Register"}
                    </Button>
                </form>
            </Form>

            {/* Login Link */}
            <p className="text-sm text-gray-600 text-center mt-3">
                Already have an account?
                <Link href="/login" className="text-primary font-semibold ml-1">
                    Login
                </Link>
            </p>
        </div>
    );
}
