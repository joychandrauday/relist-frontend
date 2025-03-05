"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaShoppingCart, FaHeart } from "react-icons/fa";
import { WordRotate } from "../magicui/word-rotate";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { logout } from "@/services/AuthService";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { IUser } from "@/types/user";

const Navbar = ({ user }: { user?: IUser }) => {

    return (
        <nav className="w-full bg-white">

            {/* Top Bar */}
            <div className=" text-gray-600 text-sm py-1 flex justify-between items-center px-6 border-b">
                <div className="flex gap-4 w-1/3">
                    <span>📞 +880 1234-567890</span>
                </div>
                <div className="w-1/3 text-center">
                    <WordRotate
                        className="text-sm font-bold text-green-600 dark:text-white"
                        words={["Re-list", "Reuse", "Recycle"]}
                    />
                </div>
                <div className="flex justify-end gap-4 w-1/3">
                    <FaFacebookF className="cursor-pointer hover:text-[#FB8500]" />
                    <FaTwitter className="cursor-pointer hover:text-[#FB8500]" />
                    <FaInstagram className="cursor-pointer hover:text-[#219EBC]" />
                </div>
            </div>

            {/* Middle Bar */}
            <div className=" py-4 flex flex-col items-center justify-between px-6 gap-4">
                <Link href="/" className="">
                    <Image
                        src="/relistpng.png"
                        alt="relist"
                        width={250}
                        height={150}
                    />

                </Link>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="px-4 py-2 rounded-lg border border-[#219EBC] text-gray-600 focus:outline-none w-full md:w-1/3"
                />
            </div>

            <div className="bg-[#023047] text-white py-1 flex justify-between items-center px-6 text-md font-semibold">
                {/* Nav Items */}
                <div className="flex gap-6">
                    <Link href="/" className="hover:text-[#FB8500]">Home</Link>
                    <Link href="/products" className="hover:text-[#FB8500]">Products</Link>
                    <Link href="/about" className="hover:text-[#FB8500]">About</Link>
                    <Link href="/contact" className="hover:text-[#FB8500]">Contact</Link>
                </div>

                {/* User Section */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link href={'/wishlist'}>
                                <FaHeart className="text-2xl text-[#ffffff] cursor-pointer hover:text-[#FB8500]" />
                            </Link>
                            <FaShoppingCart className="text-2xl text-[#ffffff] cursor-pointer hover:text-[#FB8500]" />
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>User</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="bg-red-500 cursor-pointer"
                                        onClick={() => signOut()}
                                    >
                                        <LogOut />
                                        <span>Log Out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <div className="flex items-center">
                            <Link href="/login" className="px-4 py-2 text-white hover:text-[#FB8500]">
                                Login
                            </Link>
                            <div className="divider">/</div>
                            <Link href="/register" className="px-4 py-2  hover:text-[#FB8500]">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
