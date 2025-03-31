/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IOrder } from "@/types/orders";
import { IProduct } from "@/types/product";

const UserOverview = ({ listingMeta, purchaseMeta, salesMeta }: { listingMeta: any, purchaseMeta: any, salesMeta: any }) => {
    return (
        <div className="p-6 w-full min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">User Overview</h1>

            <div className="grid justify-between w-full grid-cols-1 md:grid-cols-3 gap-6 ">
                <Card>
                    <CardHeader>
                        <CardTitle>Listings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">{listingMeta?.meta?.total || 0}</p>
                        <p className="text-gray-500 dark:text-gray-400">Total Listings</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Purchases</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">{purchaseMeta?.length || 0}</p>
                        <p className="text-gray-500 dark:text-gray-400">Total Purchases</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">{salesMeta?.length || 0}</p>
                        <p className="text-gray-500 dark:text-gray-400">Total Sales</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders Section */}
            <div className="mt-8 w-full">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Orders</h2>
                <Card>
                    <CardContent>
                        {purchaseMeta.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {purchaseMeta && purchaseMeta.map((order: Partial<IOrder>, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>{order.transaction?.id}</TableCell>
                                            <TableCell>{order.amount}</TableCell>
                                            <TableCell>{order.orderStatus}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No recent orders found.</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Recent Listings Section */}
            <div className="mt-8 w-full ">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Listings</h2>
                <Card>
                    <CardContent>
                        {listingMeta?.meta?.total && listingMeta?.meta?.total > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Listing ID</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {listingMeta.listings.map((listing: Partial<IProduct>, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>{listing._id}</TableCell>
                                            <TableCell>{listing.title}</TableCell>
                                            <TableCell>{listing.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No recent listings found.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default UserOverview;
