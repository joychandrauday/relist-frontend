import ProductContainer from '@/components/modules/Products/ProductContainer';
import { getAllListings } from '@/services/listings';
import React from 'react';
type SearchParams = {
    [key: string]: string | string[];
};

const ProductPage = async ({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) => {
    const resolvedParams = await searchParams;
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
        <div className=''>
            <ProductContainer data={data} />
        </div>
    );
}



export default ProductPage;
