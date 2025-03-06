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
    return (
        <div className=' px-4'>
            <ListingTable listings={listings?.listings} />
            <TablePagination totalPage={listings?.meta.totalPages} />
        </div>
    );
}

export default ManageListing;
