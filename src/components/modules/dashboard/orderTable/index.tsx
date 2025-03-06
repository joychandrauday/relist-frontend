import React from 'react';
import OrderRow from './OrderRow';
import { IOrder } from '@/types/orders';

const OrderTable = ({ orders }: { orders: IOrder[] }) => {
    console.log(orders);
    return (
        <div className="overflow-x-scroll  bg-transparent shadow-md rounded-none p-4">
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="border">
                        <th className="p-2 border">Order ID</th>
                        <th className="p-2 border">Product</th>
                        <th className="p-2 border">Quantity</th>
                        <th className="p-2 border">Total Price</th>
                        <th className="p-2 border">Payment Status</th>
                        <th className="p-2 border">Order Status</th>
                        <th className="p-2 border">Transaction Method</th>
                        <th className="p-2 border">Estimated Delivery</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.length > 0 ?
                        (orders?.map((order) => (
                            <OrderRow key={order._id} order={order} />
                        )))
                        : <tr>
                            <td colSpan={12} className="text-center py-4 text-gray-500">
                                No Purchase History found
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
