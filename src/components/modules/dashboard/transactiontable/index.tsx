'use client'
import { updateListing } from '@/services/listings';
import { updateTransactionStatus } from '@/services/sales-purchase';
import React from 'react';
import { toast } from 'sonner';

const TransactionTable = ({ orders }) => {
    const handleStatusChange = async (orderId, newStatus, productID) => {
        const updateData = {
            status: newStatus
        }
        const res = await updateTransactionStatus(orderId, updateData);
        if (res.data.status === 'completed') {
            const response = await updateListing({ status: 'sold' }, productID)
            console.log(response);
            toast.success('Order updated successfully!!')
            window.location.reload()
            return;
        }
        toast.success('Order updated to pending successfully!!')
        window.location.reload()
    };
    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full bg-white shadow-md rounded-none overflow-hidden">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="border px-4 py-2">Order ID</th>
                        <th className="border px-4 py-2">Buyer</th>
                        <th className="border px-4 py-2">Item</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Payment</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order._id} className="border-b">
                                <td className="border px-4 py-2">{order.orderID.transaction.id}</td>
                                <td className="border px-4 py-2">
                                    {order.buyerID?.name || 'N/A'}
                                </td>
                                <td className="border px-4 py-2">
                                    {order.itemID?.title || 'N/A'}
                                </td>
                                <td className="border px-4 py-2">
                                    {order.itemID?.price ? `${order.itemID.price} BDT` : 'N/A'}
                                </td>
                                <td className="border px-4 py-2">
                                    {order.orderID.transaction.bank_status || 'N/A'}
                                </td>
                                <td className="border px-4 py-2">
                                    <select
                                        value={order.status || 'N/A'}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value, order.itemID._id)}
                                        className="border px-2 py-1 rounded-md"
                                    >
                                        <option value="N/A">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </td>
                                <td className="border px-4 py-2">
                                    {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="text-center py-4 text-gray-500">
                                No transactions found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
