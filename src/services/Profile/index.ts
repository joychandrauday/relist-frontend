/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidatePath } from 'next/cache';

// Fetch user profile
export const getSingleUserProfile = async (userId: string) => {
    try {
        const apiUrl = `${process.env.SERVER_API}/users/${userId}`;

        const res = await fetch(apiUrl, {
            method: 'GET',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch user. Status code: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error: any) {
        console.error("Error fetching user:", error.message);
        throw new Error(error.message);
    }
};

// Update user profile
export const updateUser = async (
    userData: any,
    userId: string
): Promise<any> => {
    try {
        const res = await fetch(
            `${process.env.SERVER_API}/users/${userId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );

        const updatedUser = await res.json();
        revalidatePath(`/user/dashboard`);
        return updatedUser;
    } catch (error: any) {
        console.error("Error updating user:", error.message);
        return Error(error.message);
    }
};
// Update user profile
export const deleteUser = async (
    userId: string
): Promise<any> => {
    try {
        const res = await fetch(
            `${process.env.SERVER_API}/users/${userId}`,
            {
                method: "DELETE",
            }
        );

        const deleted = await res.json();
        revalidatePath(`/user/dashboard`);
        return deleted;
    } catch (error: any) {
        console.error("Error updating user:", error.message);
        return Error(error.message);
    }
};
