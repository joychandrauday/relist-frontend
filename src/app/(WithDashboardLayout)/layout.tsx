"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TbBurger } from "react-icons/tb";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const userNavLinks = [
  { title: "Dashboard", url: "/user/dashboard" },
  { title: "Track Purchases", url: "/user/dashboard/purchase-history" },
  { title: "Manage Listings", url: "/user/dashboard/listing" },
  { title: "Track Sales", url: "/user/dashboard/sales-history" },
  { title: "Profile", url: "/user/dashboard/profile" },
];

const adminNavLinks = [
  { title: "Admin Dashboard", url: "/admin/dashboard/" },
  { title: "Manage Users", url: "/admin/dashboard/users" },
  { title: "Manage Listings", url: "/admin/dashboard/listings" },
  { title: "Reports", url: "/admin/dashboard/reports" },
  { title: "Settings", url: "/admin/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Get user role (default to "user" if not found)
  const role = session?.user?.role || "user";
  const navLinks = role === "admin" ? adminNavLinks : userNavLinks;

  // State to handle the mobile sidebar visibility
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toggle the mobile sidebar visibility
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen mt-0">
      {/* Hamburger Button for Mobile */}
      <button
        className="md:hidden absolute top-0 left-0 text-[#F68906] block p-4 text-5xl z-50"
        onClick={toggleMobileSidebar}
      >
        <TbBurger />
      </button>

      {/* Mobile Sidebar (Overlay) */}
      <aside
        className={`fixed top-0 left-0 w-64 bg-gray-900 text-white flex flex-col p-4 h-full z-40 transform transition-transform ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
      >
        {/* Logo */}
        <Link href={'/'} className="flex items-center justify-center mb-8">
          <Image src="/relistpng.png" alt="Company Logo" width={150} height={50} />
        </Link>

        {/* Navigation Links */}
        <nav className="flex-1">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.url}>
                <Link
                  href={link.url}
                  className={`block px-4 py-2 rounded transition ${pathname === link.url ? "bg-[#F68906]" : "hover:bg-gray-700"
                    }`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info & Logout Button */}
        <div className="mt-auto border-t border-gray-700 pt-4">
          {session?.user && (
            <div className="text-center mb-4">
              <p className="text-sm font-semibold">{session.user.name}</p>
              <p className="text-xs text-gray-400">{session.user.email}</p>
              <p className="text-xs text-gray-500">Role: {role}</p>
            </div>
          )}
          <button
            onClick={() => signOut()}
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            Logout
          </button>
        </div>
      </aside>

      <aside
        className={`sticky hidden top-0 left-0 w-64 bg-gray-900 text-white md:flex flex-col p-4 h-full z-40 transform transition-transform min-h-screen`}
      >
        {/* Logo */}
        <Link href={'/'} className="flex items-center justify-center mb-8">
          <Image src="/relistpng.png" alt="Company Logo" width={150} height={50} />
        </Link>

        {/* Navigation Links */}
        <nav className="flex-1">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.url}>
                <Link
                  href={link.url}
                  className={`block px-4 py-2 rounded transition ${pathname === link.url ? "bg-[#F68906]" : "hover:bg-gray-700"
                    }`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info & Logout Button */}
        <div className="mt-auto border-t border-gray-700 pt-4">
          <div className="wrap">
            <div className="flex gap-4 items-center  mb-4">
              <Avatar>
                <AvatarImage src={session?.user?.avatar || ""} alt={session?.user?.name} />
              </Avatar>
              <div className="text-center ">
                <p className="text-sm font-semibold">{session?.user?.name}</p>
                <p className="text-xs text-gray-400">{session?.user?.email}</p>
                <p className="text-xs text-gray-500">Role: {role}</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-0 ml-0">{children}</main>

      {/* Overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={toggleMobileSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
        ></div>
      )}
    </div>
  );
}
