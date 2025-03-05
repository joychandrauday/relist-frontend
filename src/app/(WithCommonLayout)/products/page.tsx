import ProductContainer from '@/components/modules/Products/ProductContainer';
import { getAllListings } from '@/services/listings';
import React from 'react';
type SearchParams = {
    [key: string]: string | string[] | undefined;
};

const ProductPage = async ({
    searchParams,
}: {
    searchParams: Promise<SearchParams>; // SearchParams কে Promise হিসাবে ধরতে হবে
}) => {
    const resolvedParams = await searchParams; // searchParams কে await করুন
    const sanitizedParams = Object.fromEntries(
        Object.entries(resolvedParams).map(([key, value]) => [
            key,
            Array.isArray(value) ? value.join(',') : String(value),
        ])
    );

    const queryParams = new URLSearchParams(sanitizedParams);
    const queryString = queryParams.toString();

    const { data } = await getAllListings('6', queryString);
    return (
        <div>
            <ProductContainer data={data} />
        </div>
    );
}



export default ProductPage;
