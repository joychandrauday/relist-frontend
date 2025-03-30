import React from "react";
import OrderRow from "./OrderRow";
import { IOrder } from "@/types/orders";

const OrderTable = ({ orders }: { orders: IOrder[] }) => {
    return (
        <div className="w-full bg-transparent shadow-md rounded-lg p-4">
            {/* Scrollable container for smaller screens */}
            <div className="w-full overflow-x-auto">
                <table className="min-w-[800px] sm:min-w-full table-auto border-collapse">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr className="border text-xs md:text-sm">
                            <th className="p-2 border whitespace-nowrap">Product</th>
                            <th className="p-2 border whitespace-nowrap">Quantity</th>
                            <th className="p-2 border whitespace-nowrap">Total Price</th>
                            <th className="p-2 border whitespace-nowrap">Payment Status</th>
                            <th className="p-2 border whitespace-nowrap">Order Status</th>
                            <th className="p-2 border whitespace-nowrap">Transaction Method</th>
                            <th className="p-2 border whitespace-nowrap">Estimated Delivery</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.length > 0 ? (
                            orders?.map((order) => (
                                <OrderRow key={order._id} order={order} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center py-4 text-gray-500">
                                    No Purchase History found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderTable;
