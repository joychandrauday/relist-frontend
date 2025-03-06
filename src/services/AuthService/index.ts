/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.SERVER_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`https://relist-backend.vercel.app/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};
export const logout = async () => {
  (await cookies()).delete("accessToken");
};

export const addToWishlist = async (productId: any) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    let decodedData = null;

    if (accessToken) {
      decodedData = await jwtDecode(accessToken);
      const res = await fetch(`${process.env.SERVER_API}/users/${decodedData.id}/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listingId: productId }),
      });
      const result = await res.json();

      return result;
    } else {
      return null;
    }
  } catch (error: any) {
    return Error(error);
  }
};
export const removeFromWishlist = async (productId: any) => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    let decodedData = null;

    if (accessToken) {
      decodedData = await jwtDecode(accessToken);
      const res = await fetch(`${process.env.SERVER_API}/users/${decodedData.id}/wishlist`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listingId: productId }),
      });
      const result = await res.json();
      return result;
    } else {
      return null;
    }
  } catch (error: any) {
    return Error(error);
  }
};