"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { ShinyButton } from "../magicui/shiny-button";
import { signOut } from "next-auth/react";
export interface Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null
  };
}

const NavbarDesign = ({ session }: { session: Session | null }) => {
  // const { theme, setTheme } = useTheme();
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <div
      className={`fixed w-full md:justify-around z-50 flex justify-between border-b px-8 py-3 border-gray-500 transition-all duration-300 ${scrolling ? "backdrop-blur-md bg-opacity-75 " : "bg-transparent"
        }`}
    >
      {/* Navbar Start */}
      <div className="navbar-start flex items-center gap-4 w-1/3">
        <div className="flex gap-6">
          <Link href="/" className="hover:text-[#FB8500]">Home</Link>
          <Link href="/products" className="hover:text-[#FB8500]">Products</Link>
          <Link href="/about" className="hover:text-[#FB8500]">About</Link>
          <Link href="/contact" className="hover:text-[#FB8500]">Contact</Link>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="flex items-center justify-center px-4 w-1/3">
        <Link href="/" className="">
          <Image src={'/relistpng.png'} width={200} height={100} alt="logo" />
        </Link>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center justify-end gap-4 w-1/3">
        {/* Theme Toggle
        <ShinyButton onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-lg">
          {theme === "dark" ? "☀️" : "🌙"}
        </ShinyButton> */}

        <Link href={'/wishlist'}>
          <FaHeart className="text-2xl text-[#ffffff] cursor-pointer hover:text-[#FB8500]" />
        </Link>

        {/* User Dropdown */}
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="btn btn-ghost btn-circle avatar">
              <Image src={session.user.image || "/relisticon.png"} width={40} height={40} alt="User Avatar" className="rounded-full" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuItem className="font-bold">
                Welcome,<br /> <h1 className="">{session.user?.name ?? 'Unknown'}</h1>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-bold">
                <a href={`${session.user.role === 'admin' ? 'admin' : 'user'}/dashboard`}> Dashboard </a>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login" className="btn btn-outline">
            Sign In
          </Link>
        )}
      </div>
    </div >
  );
};



export default NavbarDesign;
