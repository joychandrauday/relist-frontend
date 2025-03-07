'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { createOrder, createTransaction } from '@/services/cart';
import { useSession } from 'next-auth/react';

// Define types for product and order info
interface Product {
    _id: string;
    price: number;
    title: string;
    description: string;
    userID: {
        _id: string;
        name: string;
    };
}

interface FormData {
    name: string;
    address: string;
    phone: string;
}

const CheckoutForm = ({ product }: { product: Product }) => {
    const { data: session } = useSession();
    const [formData, setFormData] = useState<FormData>({
        name: session?.user?.name || '',
        address: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const orderInfo = {
            user: session?.user?.id,
            product: {
                productId: product._id,
                quantity: 1, // Since it's a single product checkout
                price: product.price,
                totalPrice: product.price, // Only one product, so total = price
            },
            amount: product.price,
            shippingAddress: formData.address,
            phone: formData.phone,
            paymentStatus: 'Pending',
            orderStatus: 'Pending',
            estimatedDeliveryDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
            orderDate: new Date(),
        };

        try {
            const response = await createOrder(orderInfo);

            if (response.status) {
                const transactionInfo = {
                    buyerID: session?.user?.id,
                    sellerID: product.userID._id,
                    orderID: response.data.payment.customer_order_id,
                    itemID: product._id,
                    status: 'pending',
                };

                await createTransaction(transactionInfo);
                router.push(response.data.payment.checkout_url);
            } else {
                alert('Error processing your order.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={session?.user?.name}
                        onChange={handleChange}
                        readOnly
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold">Shipping Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow w-full"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Buy Now'}
                </Button>
            </form>
        </div>
    );
};

export default CheckoutForm;
