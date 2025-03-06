'use client'
import React from 'react';
import TablePagination from '../ListingTable/TablePagination';
import { IUser } from '@/types/user';
import Userble from './UsersTable';

const ManageUser = ({ users }: {
    users: {
        users: IUser[],
        meta: {
            totalPages: number
        }
    }

}) => {
    return (
        <div>
            <Userble totalPages={users.meta.totalPages} users={users?.users} />
            <TablePagination totalPage={users.meta.totalPages} />
        </div>
    );
}

export default ManageUser;
