"use server";

import { revalidateTag } from "next/cache";

export const revalidateProductTag = async () => {
    revalidateTag("LISTINGS");
};
