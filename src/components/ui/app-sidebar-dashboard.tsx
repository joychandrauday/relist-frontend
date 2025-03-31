import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { FaTachometerAlt, FaHistory, FaListAlt, FaShoppingCart, FaUser, FaBolt } from "react-icons/fa";
import { RiGroupLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { NavUser } from "../modules/dashboard/Profile/nav-user";

const userNavLinks = [
    { title: "Dashboard", url: "/user/dashboard", icon: FaTachometerAlt },
    { title: "Track Purchases", url: "/user/dashboard/purchase-history", icon: FaHistory },
    { title: "Manage Listings", url: "/user/dashboard/listing", icon: FaListAlt },
    { title: "Track Sales", url: "/user/dashboard/sales-history", icon: FaShoppingCart },
    { title: "Profile", url: "/user/dashboard/profile", icon: FaUser },
];

const adminNavLinks = [
    { title: "Admin Dashboard", url: "/admin/dashboard/", icon: FaTachometerAlt },
    { title: "Manage Users", url: "/admin/dashboard/users", icon: RiGroupLine },
    { title: "Manage Listings", url: "/admin/dashboard/listings", icon: FaListAlt },
    { title: "Flash Sale Management", url: "/admin/dashboard/flash-sale/add", icon: FaBolt },
    { title: "Profile", url: "/admin/dashboard/profile", icon: FaUser },
];

export function AppSidebar() {
    const { data: session } = useSession();
    if (!session) return null;
    const role = session?.user?.role || "user";
    const items = role === "admin" ? adminNavLinks : userNavLinks;

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Link href={'/'} className="flex items-center justify-center mb-4">
                    <Image src="/relistpng.png" alt="Company Logo" width={150} height={50} />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
