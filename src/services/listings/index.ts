"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// get all products
export const getAllListings = async (page?: string, limit?: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/listings/all?limit=${limit}&page=${page}`
        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};
export const getAllListingsByUser = async (page?: string, limit?: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/listings/user?limit=${limit}&page=${page}`,
            {
                headers: {
                    authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );
        const data = await res.json();
        // revalidateTag("PRODUCT");
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};

// get single product
export const getSingleProduct = async (productId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
            {
                next: {
                    tags: ["PRODUCT"],
                },
            }
        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};

export const addListing = async (listingData: any): Promise<any> => {
    try {
        console.log(listingData);  // Check if listing data contains values

        // Send the data as JSON in the request body
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
            method: "POST",
            body: JSON.stringify(listingData),  // Send data as JSON
            headers: {
                'Content-Type': 'application/json',  // Set content type to JSON
                authorization: (await cookies()).get("accessToken")!.value,
            },
        });

        console.log(res);
        return res.json();  // Return the response as JSON
    } catch (error: any) {
        return Error(error);
    }
};


// update product
export const updateListing = async (
    productData: any,
    productId: string
): Promise<any> => {
    try {
        console.log(productData);
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/listings/${productId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: (await cookies()).get("accessToken")!.value,
                },
                body: JSON.stringify(productData),
            }
        );
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};
export const deleteListing = async (
    productId: string
): Promise<any> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/listings/${productId}`,
            {
                method: "DELETE",
                headers: {
                    authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );
        console.log(res);
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};
