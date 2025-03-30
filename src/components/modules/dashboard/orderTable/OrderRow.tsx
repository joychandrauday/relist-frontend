'use client'
import { IOrder } from '@/types/orders';
import React from 'react';

const OrderRow = ({ order }: { order: IOrder }) => {
    return (
        <tr className="border-b">
            <td className="p-2 border">
                {order.products.map((product, index) => (
                    <div key={index} className="border-b last:border-0 p-1">
                        {product.productId?.title}
                    </div>
                ))}
            </td>
            <td className="p-2 border">
                {order.products.map((product, index) => (
                    <div key={index} className="border-b last:border-0 p-1">
                        {product?.quantity}
                    </div>
                ))}
            </td>
            <td className="p-2 border">{order.amount}৳</td>
            <td className="p-2 border">{order?.paymentStatus}</td>
            <td className="p-2 border">{order?.orderStatus}</td>
            <td className="p-2 border">{order?.transaction.method}</td>
            <td className="p-2 border">
                {/* Handle undefined estimatedDeliveryDate */}
                {order.estimatedDeliveryDate
                    ? new Date(order.estimatedDeliveryDate).toLocaleDateString()
                    : 'N/A'}
            </td>
        </tr>
    );
};

export default OrderRow;
