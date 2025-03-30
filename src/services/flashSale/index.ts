/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

// get all products
export const getAllFlashSale = async (
    limit?: string,
    query?: string
) => {
    try {
        const res = await fetch(
            `${process.env.SERVER_API}/flash-sale?limit=${limit}&${query}`
        );
        const data = await res.json();
        return { data: data.data, meta: data.meta };
    } catch (error: any) {
        return Error(error.message);
    }
};


export const addFlashsale = async (flashsaleData: any): Promise<any> => {
    const session = await getServerSession(authOptions);

    try {

        // Send the data as JSON in the request body
        const res = await fetch(`${process.env.SERVER_API}/flash-sale`, {
            method: "POST",
            body: JSON.stringify(flashsaleData),
            headers: {
                'Content-Type': 'application/json',
                authorization: `${session?.user?.accessToken}`,
            },
        });
        revalidatePath(`/admin/dashboard`);
        return res.json();  // Return the response as JSON
    } catch (error: any) {
        return Error(error);
    }
};


export const deleteFlashsale = async (
    productId: string
): Promise<any> => {
    try {
        const session = await getServerSession(authOptions);
        const res = await fetch(
            `${process.env.SERVER_API}/flash-sale/remove/${productId}`,
            {
                method: "DELETE",
                headers: {
                    authorization: `${session?.user?.accessToken}`,
                },
            }
        );
        revalidatePath(`/user/dashboard`);
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};
