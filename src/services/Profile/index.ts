/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";
// get all products

export const getSingleUser = async (userId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`,
        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};


// update product
export const updateUser = async (
    userData: any,
    userId: string
): Promise<any> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/listings/${userId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: (await cookies()).get("accessToken")!.value,
                },
                body: JSON.stringify(userData),
            }
        );
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};
