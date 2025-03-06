import OrderTable from '@/components/modules/dashboard/orderTable';
import { getOrdersByUserId } from '@/services/sales-purchase';
import React from 'react';

const PurchaseHistory = async () => {
    const { data: orders } = await getOrdersByUserId();
    console.log(orders);
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Purchase History</h1>
            <OrderTable orders={orders} />
        </div>
    );
}

export default PurchaseHistory;
