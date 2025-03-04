import React from 'react';
import UserPayment from '@/components/modules/payment/UserPayment';

export default async function PaymentPage({ searchParams }: { searchParams: { order_id?: string } }) {
    const order_id = await searchParams.order_id; // ✅ No need for `await`

    console.log(order_id);
    return (
        <div className="container mx-auto p-8">
            <UserPayment orderId={order_id} />
        </div>
    );
}
