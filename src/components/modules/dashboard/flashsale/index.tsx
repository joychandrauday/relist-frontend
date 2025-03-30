'use client'
import React from 'react';
import { IProduct } from '@/types/product';
import TablePagination from '../ListingTable/TablePagination';
import FlashSale from './FlashTable';
const ManageFlashsale = ({ listings, meta }: {
    listings: IProduct[],
    meta: {
        totalPage: number
    }

}) => {
    return (
        <div className='px-4'>
            <FlashSale listings={listings} />
            <TablePagination totalPage={meta.totalPage} />
        </div>
    );
}

export default ManageFlashsale;
