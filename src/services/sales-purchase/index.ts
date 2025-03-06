/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { authOptions } from "@/utils/authOptions";
import { jwtDecode } from "jwt-decode";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const getOrdersByUserId = async () => {
    const session = await getServerSession(authOptions);
    try {
        if (session) {
            const res = await fetch(
                `${process.env.SERVER_API}/orders/${session?.user?.id}`,
                { method: "GET" }
            );
            const data = await res.json();
            // revalidatePath(`/user/dashboard`);
            return data;
        } else {
            return null;
        }
    } catch (error: any) {
        return Error(error);
    }
};
export const getOrders = async () => {
    try {
        const res = await fetch(
            `${process.env.SERVER_API}/orders`,
            { method: "GET" }
        );
        const data = await res.json();
        revalidatePath(`/user/dashboard`);
        return data;
    } catch (error: any) {
        return Error(error);
    }
};
export const getSalesByUserId = async () => {
    const session = await getServerSession(authOptions);

    try {
        const accessToken = session?.user?.accessToken;
        let decodedData = null;

        if (accessToken) {
            decodedData = await jwtDecode(accessToken);
            const res = await fetch(
                `${process.env.SERVER_API}/transactions/sales/${decodedData.id}`,
                { method: "GET" }
            );
            const data = await res.json();
            return data;
        } else {
            return null;
        }
    } catch (error: any) {
        return Error(error);
    }
};
export const updateTransactionStatus = async (transactionId: string, newStatus: { status: 'pending' | 'completed' }) => {

    try {

        const res = await fetch(
            `${process.env.SERVER_API}/transactions/${transactionId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newStatus),
            }
        );
        const data = await res.json();
        return data;

    } catch (error: any) {
        return Error(error);
    }
};