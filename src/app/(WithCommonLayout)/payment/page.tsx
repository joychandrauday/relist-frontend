import React from 'react';
import UserPayment from '@/components/modules/payment/UserPayment';
type SearchParams = {
    order_id: string | undefined;
};
export default async function PaymentPage({ searchParams }: { searchParams: Promise<SearchParams>; }) {
    const resolvedParams = await searchParams;
    const order_id = resolvedParams.order_id;
    return (
        <div className="container mx-auto p-8">
            <UserPayment orderId={order_id} />
        </div>
    );
}
