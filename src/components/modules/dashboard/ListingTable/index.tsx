'use client'
import React from 'react';
import ListingTable from './ListingTable';
import TablePagination from './TablePagination';
import { IProduct } from '@/types/product';

const ManageListing = ({ listings }: {
    listings: {
        listings: IProduct[],
        meta: {
            totalPages: number
        }
    }

}) => {
    console.log(listings);
    return (
        <div>
            <ListingTable listings={listings?.listings} />
            <TablePagination totalPage={listings.meta.totalPages} />
        </div>
    );
}

export default ManageListing;
