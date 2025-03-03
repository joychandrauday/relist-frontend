'use client'
import React from 'react';
import ListingTable from './ListingTable';
import TablePagination from './TablePagination';

const ManageListing = ({ listings }) => {
    return (
        <div>
            <ListingTable listings={listings?.listings} />
            <TablePagination totalPage={listings.meta.totalPages} />
        </div>
    );
}

export default ManageListing;
