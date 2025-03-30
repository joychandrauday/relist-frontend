import AddFlashSale from '@/components/modules/dashboard/flashsale/AddToFlashTable';
import { getAllListings } from '@/services/listings';
import React from 'react';

const Page = async ({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) => {
    const { page } = await searchParams;
    const pageQuery = `page=${page}&status=available`;
    const { data: listings } = await getAllListings('10', pageQuery);

    return (
        <div className='px-6'>
            <AddFlashSale listings={listings} />
        </div>
    );
}

export default Page;
