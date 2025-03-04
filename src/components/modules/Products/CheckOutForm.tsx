'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { createOrder, createTransaction } from '@/services/cart';
import { useUser } from '@/context/UserContext';

const CheckoutForm = ({ product }) => {
    const { user } = useUser()
    const [formData, setFormData] = useState({
        name: user?.name || '',
        address: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderInfo = {
            user: user?.id,
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
            console.log(response);
            if (response.status) {
                const transactionInfo = {
                    buyerID: user?.id,
                    sellerID: product.userID._id,
                    orderID: response.data.payment.customer_order_id,
                    itemID: product._id,
                    status: 'pending',
                };

                const transactionResponse = await createTransaction(transactionInfo);
                console.log(transactionResponse);
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
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
