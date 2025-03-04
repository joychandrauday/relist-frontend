'use server'

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const getOrdersByUserId = async () => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;
        let decodedData = null;

        if (accessToken) {
            decodedData = await jwtDecode(accessToken);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API}/orders/${decodedData.id}`,
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
export const getSalesByUserId = async () => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;
        let decodedData = null;

        if (accessToken) {
            decodedData = await jwtDecode(accessToken);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API}/transactions/sales/${decodedData.id}`,
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
export const updateTransactionStatus = async (transactionId, newStatus) => {
    try {

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/transactions/${transactionId}`,
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