import { getAllListings } from '@/services/listings';
import { getAllUsers } from '@/services/user';
import { IUser } from '@/types/user';
import React from 'react';

const ReportPage = async () => {
    const { data: users } = await getAllUsers();
    const { data: listings } = await getAllListings();


    const totalUsers = users.meta.total;
    const activeUsers: number = users.users.filter((user: IUser) => user.status === 'active').length;
    const inactiveUsers: number = users.users.filter((user: IUser) => user.status === 'ban').length;


    return (
        <div className="min-h-screen md:w-full sm:w-[100vw] bg-gray-100 p-1">
            {/* Page Header */}
            <header className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-blue-600">Report Dashboard</h1>
                <p className="text-lg text-gray-600">Overview of Products, Users, and Orders</p>
            </header>

            {/* Metadata Section (3 columns layout) */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">

                {/* Products Metadata Section */}
                <section className=" p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Product Metadata</h2>
                    <div className="grid gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Total Products</p>
                            <h3 className="text-xl font-bold">{listings.meta.total}</h3>
                        </div>

                    </div>
                </section>

                {/* Users Metadata Section */}
                <section className=" p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Metadata</h2>
                    <div className="grid gap-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Total Users</p>
                            <h3 className="text-xl font-bold">{totalUsers}</h3>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Active Users</p>
                            <h3 className="text-xl font-bold">{activeUsers}</h3>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Inactive Users</p>
                            <h3 className="text-xl font-bold">{inactiveUsers}</h3>
                        </div>
                    </div>
                </section>


            </div>

        </div>
    );
};

export default ReportPage;
