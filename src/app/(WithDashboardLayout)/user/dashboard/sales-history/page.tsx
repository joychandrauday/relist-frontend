
import TransactionTable from '@/components/modules/dashboard/transactiontable';
import { getSalesByUserId } from '@/services/sales-purchase';
import React from 'react';

const SalesPage = async () => {
    const { data: sales } = await getSalesByUserId();
    return (
        <div className='pt-20 sm:w-[100vw] px-4'>
            <h1 className="text-2xl font-semibold mb-4">Sales History History</h1>
            <TransactionTable orders={sales} />

        </div>
    );
}

export default SalesPage;
