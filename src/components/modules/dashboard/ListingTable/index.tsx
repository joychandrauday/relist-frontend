'use client'
import React from 'react';
import TablePagination from './TablePagination';
import { IProduct } from '@/types/product';
import ListingTable from './ListingTable';

const ManageListing = ({ listings }: {
    listings: {
        listings: IProduct[],
        meta: {
            totalPages: number
        }
    }

}) => {
    return (
        <div className=' px-4'>
            <ListingTable listings={listings?.listings} />
            <TablePagination totalPage={listings?.meta.totalPages} />
        </div>
    );
}

export default ManageListing;
