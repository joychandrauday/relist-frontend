/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { IMessage } from "@/types/user";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const sendMessage = async (message: IMessage) => {
    try {
        const res = await fetch(`${process.env.SERVER_API}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        });
        const data = await res.json()
        return data;
    } catch (error: any) {
        console.log(error);
        return Error(error);
    }
};
export const getMessage = async (userId: string | undefined, receiverId: string) => {
    if (!userId || !receiverId) return []; // Ensure valid IDs

    try {
        const url = `${process.env.SERVER_API}/messages/${userId}/${receiverId}`;

        const res = await fetch(url, { method: "GET" });

        if (!res.ok) throw new Error(`Failed to fetch messages: ${res.statusText}`);

        const data = await res.json();
        revalidatePath('/products')
        return data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
};
export const getAllSidebarUsers = async (query?: string) => {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            throw new Error("User is not authenticated");
        }
        const res = await fetch(`${process.env.SERVER_API}/messages/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                search: query || "",
            }),
        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return new Error(error.message);
    }
};
export const getSingleSidebarUser = async (userId: string) => {
    try {

        if (!userId) {
            throw new Error("User is not authenticated");
        }
        const res = await fetch(`${process.env.SERVER_API}/messages/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            }),
        });
        console.log(res);
        const data = await res.json();
        return data;
    } catch (error: any) {
        return new Error(error.message);
    }
};
