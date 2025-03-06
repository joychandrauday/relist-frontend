'use client'
import { IOrder } from '@/types/orders';
import React from 'react';

const OrderRow = ({ order }: { order: IOrder }) => {
    return (
        <tr className="border-b">
            <td className="p-2 border">{order._id}</td>
            <td className="p-2 border">{order.product.productId.title}</td>
            <td className="p-2 border">{order.product.quantity}</td>
            <td className="p-2 border">{order.product.totalPrice}৳</td>
            <td className="p-2 border">{order.paymentStatus}</td>
            <td className="p-2 border">{order.orderStatus}</td>
            <td className="p-2 border">{order.transaction.method}</td>
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
