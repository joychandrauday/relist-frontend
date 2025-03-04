'use client'
import React from 'react';

const OrderRow = ({ order }) => {
    console.log(order);
    return (
        <tr className="border-b">
            <td className="p-2 border">{order._id}</td>
            <td className="p-2 border">{order.product.productId.title}</td>
            <td className="p-2 border">{order.product.quantity}</td>
            <td className="p-2 border">{order.product.totalPrice}৳</td>
            <td className="p-2 border">{order.paymentStatus}</td>
            <td className="p-2 border">{order.orderStatus}</td>
            <td className="p-2 border">{order.transaction.method}</td>
            <td className="p-2 border">{new Date(order.estimatedDeliveryDate).toLocaleDateString()}</td>
        </tr>
    );
};

export default OrderRow;
