"use server";

import { cookies } from "next/headers";

export const createOrder = async (order) => {
  try {
    console.log(order);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    return await res.json();
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};

export const verifyOrder = async (orderId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orders/verify/payment?sp_trxn_id=${orderId}`,
      { method: "GET" }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleOrder = async (orderId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orders/single/orderId`,
      { method: "GET" }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const createTransaction = async (order) => {
  try {
    console.log(order);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};