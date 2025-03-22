"use client";
import Link from "next/link";
import Image from "next/image";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavUser } from "../modules/dashboard/Profile/nav-user";
import { Input } from "./input";
import { IUser } from "@/types/user";

// User list with active status

export function AppSidebar({ users }: { users: IUser[] }) {

    return (
        <Sidebar collapsible='icon'>
            {/* Sidebar Header */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" className="flex items-center justify-center">
                                <Image src="/relistpng.png" alt="relist" width={150} height={80} />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Sidebar Content */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Messages</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <Input placeholder="Search people..." className="" />
                            {users.map((user: IUser) => (
                                <SidebarMenuItem key={user._id} >
                                    <SidebarMenuButton asChild >
                                        <Link href={`/message/${user._id}`} className="flex items-center space-x-3 space-y-4" passHref>
                                            {/* Avatar with Active Dot */}
                                            <div className="relative">
                                                <Avatar>
                                                    <AvatarImage src={user.avatar || "/avatar.png"} />
                                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                                                </Avatar>
                                                {/* <span
                                                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${user.active ? "bg-green-500" : "bg-gray-400"
                                                        }`}
                                                ></span> */}
                                            </div>
                                            {/* User Name */}
                                            <span>{user.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Sidebar Footer */}
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
