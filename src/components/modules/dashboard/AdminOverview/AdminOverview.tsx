/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IOrder } from "@/types/orders";
import { Users, List, ShoppingCart, BarChart3, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";


const AdminOverview = ({ listings, users, orders }: { listings: any, users: any, orders: any }) => {
    const stats = [
        { title: "Total Listings", count: listings.meta.total, icon: <List className="w-8 h-8 text-blue-500" /> },
        { title: "Total Users", count: users.meta.total, icon: <Users className="w-8 h-8 text-green-500" /> },
        { title: "Total Orders", count: orders.length || 0, icon: <ShoppingCart className="w-8 h-8 text-red-500" /> },
    ];

    const chartData = [
        { name: "Listings", value: listings.meta.total },
        { name: "Users", value: users.meta.total },
        { name: "Orders", value: orders.length || 0 },
    ];

    const ordersByDate = orders.reduce((acc: { [key: string]: number }, order: IOrder) => {
        const date = order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Unknown Date"; // Check if createdAt exists
        acc[date] = (acc[date] || 0) + order.amount; // Accumulate the total order amount (in Taka) per date
        return acc;
    }, {});


    const ordersChartData = Object.keys(ordersByDate).map(date => ({ name: date, value: ordersByDate[date] }));

    // Calculate total amount sold
    const totalAmountSold = orders.reduce((acc: number, order: IOrder) => acc + order.amount, 0);

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
                <Card
                    key={index}
                    className="shadow-md rounded-2xl bg-white/10 backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform"

                >
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-200">{stat.title}</CardTitle>
                        {stat.icon}
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-gray-100">{stat.count}</p>
                    </CardContent>
                </Card>
            ))}

            <Card className="col-span-1 sm:col-span-2 md:col-span-3 p-6 shadow-md rounded-2xl bg-white/10 backdrop-blur-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-200">Statistics Overview</CardTitle>
                    <BarChart3 className="w-8 h-8 text-purple-500" />
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" stroke="#ddd" />
                            <YAxis stroke="#ddd" />
                            <Tooltip wrapperClassName="text-black" />
                            <Bar dataKey="value" fill="#6366F1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="col-span-1 sm:col-span-2 md:col-span-3 p-6 shadow-md rounded-2xl bg-white/10 backdrop-blur-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-200">Orders Over Time</CardTitle>
                    <Calendar className="w-8 h-8 text-[#FA8800]" />
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300} className={"text-[#FA8800]"} >
                        <LineChart data={ordersChartData}>
                            <XAxis dataKey="name" stroke="#ddd" />
                            <YAxis stroke="#ddd" />
                            <Tooltip wrapperClassName="text-black" />
                            <Line type="monotone" dataKey="value" stroke="#EAB308" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* New Card for Total Amount Sold */}
            <Card className="col-span-1 sm:col-span-2 md:col-span-3 p-6 shadow-md rounded-2xl bg-white/10 backdrop-blur-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-200">Total Amount Sold</CardTitle>
                    <ShoppingCart className="w-8 h-8 text-green-500" />
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-gray-100">{totalAmountSold.toLocaleString('en-US')} ৳</p>
                </CardContent>
            </Card>
        </div>
    );
}

export default AdminOverview;
