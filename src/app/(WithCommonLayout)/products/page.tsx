import ProductContainer from '@/components/modules/Products/ProductContainer';
import ProductFilter from '@/components/modules/Products/ProductFilter';
import { getAllListings } from '@/services/listings';
import React from 'react';
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const ProductPage = async ({
    searchParams,
}: {
    searchParams: SearchParams;
}) => {
    const query = await searchParams;
    // Extract the 'page' value from the query params
    const page = query.page ? query.page : '1';
    console.log(page);
    const queryString = new URLSearchParams(query).toString();

    const { data: data } = await getAllListings('6', queryString)
    return (
        <div>
            <ProductContainer data={data} />
        </div>
    );
}

export default ProductPage;
