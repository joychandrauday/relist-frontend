"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { FaHeart, FaBars, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { WordRotate } from "../magicui/word-rotate";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/redux/hook";
import { orderedProducts } from "@/redux/features/cartSlice";
import CategoriesDropdown from "./CategoriesDropdown";
import NavSearch from "./NavSearch";
import { getAllSidebarUsers } from "@/services/message";
import { IUser } from "@/types/user";
export interface Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null
  };
}

const NavbarDesign = ({ session }: { session: Session | null }) => {
  const { theme, setTheme } = useTheme();
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatUser, setChatUser] = useState<IUser[]>([]);

  const products = useAppSelector(orderedProducts);
  const router = useRouter()
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
  useEffect(() => {
    const fetchChatUser = async () => {
      // Fetch chat user data from your backend API
      const response = await getAllSidebarUsers();

      setChatUser(response.data);
    };
    fetchChatUser();

  }, [])
  const handleLogout = async () => {
    try {

      await signOut({ redirect: false });
      router.push("/login"); // Manually redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="wrap">
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
      </div>
      <div
        className={`w-full md:justify-around z-50 flex justify-between border-b px-8 py-3 border-gray-500 transition-all duration-300 ${scrolling ? "backdrop-blur-md bg-opacity-75 fixed top-0" : "bg-transparent"
          }`}
      >
        {/* Navbar Start (Hidden in Mobile) */}
        <div className="navbar-start hidden md:flex  items-center gap-4 w-1/2">
          <CategoriesDropdown />
        </div>
        <div className="hidden items-center md:flex gap-6">
          <Link href="/" className="hover:text-[#FB8500]">Home</Link>
          <Link href="/products" className="hover:text-[#FB8500]">Products</Link>
          <Link href="/about" className="hover:text-[#FB8500]">About</Link>
          <Link href="/contact" className="hover:text-[#FB8500]">Contact</Link>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-white">
                {menuOpen ? <IoClose /> : <FaBars />}
              </button>
            </DropdownMenuTrigger>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
              <DropdownMenuContent className="absolute top-12 left-0 w-full bg-[#1F2937] text-white flex flex-col items-center py-4">
                <DropdownMenuItem>
                  <Link href="/" className="py-2 hover:text-[#FB8500]" onClick={() => setMenuOpen(false)}>Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/products" className="py-2 hover:text-[#FB8500]" onClick={() => setMenuOpen(false)}>Products</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/about" className="py-2 hover:text-[#FB8500]" onClick={() => setMenuOpen(false)}>About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/contact" className="py-2 hover:text-[#FB8500]" onClick={() => setMenuOpen(false)}>Contact</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/cart" className="py-2 hover:text-[#FB8500]" onClick={() => setMenuOpen(false)}>Contact</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/wishlist" className="py-2 hover:text-[#FB8500]" onClick={() => setMenuOpen(false)}>Wishlist</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
        {/* Navbar End */}
        <div className="navbar-end flex items-center justify-end gap-4 w-1/2">
          {/* Theme Toggle */}
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-lg">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <NavSearch />
          <Link href={'/cart'} className="hidden md:flex items-center">
            <ShoppingCart className="text-2xl  cursor-pointer hover:text-[#FB8500]" />({products.length})
          </Link>
          <Link href={'/wishlist'} className="hidden md:block">
            <FaHeart className="text-2xl  cursor-pointer hover:text-[#FB8500]" />
          </Link>

          {/* User Dropdown */}
          {session?.user ? (
            <>
              {/* message icon  */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="/chat.gif" alt="Chat Icon" />
                    <AvatarFallback>Chat</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 shadow-lg rounded-lg ">
                  <DropdownMenuLabel className="text-lg font-semibold px-4 py-2">Recent Chats</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {chatUser.slice(0, 5).map((chat) => (
                    <DropdownMenuItem key={chat._id} className="flex items-center space-x-3 p-3 transition">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={chat.avatar} alt={chat.avatar} />
                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {/* name */}
                      <Link href={`/message/${chat._id}`}>{chat.name}</Link>
                    </DropdownMenuItem>
                  ))}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-3 text-center">
                    <Link href="/message" className="w-full text-blue-600 font-semibold hover:underline">
                      View All Messages
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>


              {/* user avatar */}
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

                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login" className="btn btn-outline">
              Sign In
            </Link>
          )}
        </div>
      </div >
    </div >
  );
};



export default NavbarDesign;
