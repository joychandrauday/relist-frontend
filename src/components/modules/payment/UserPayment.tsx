'use client'
import LoadingPage from "@/components/utils/Loading";
import { getSingleOrder, verifyOrder } from "@/services/cart";
import React, { useEffect, useState } from "react";

// Order Status Response Type
interface OrderStatusResponse {
    status: boolean;
    message: string;
    data: OrderStatus[];
}

interface OrderStatus {
    id: number;
    customer_order_id: string;
    order_id: string;
    amount: number;
    bank_status: string;
    payable_amount: number;
    received_amount: string;
    method: string;
    date_time: string;
    name: string;
    phone_no: string;
    email: string;
    address: string;
    city: string;
}
interface ProductResponse {
    data: {
        product: ProductDetails;
        shippingAddress: string;
        estimatedDeliveryDate: string;
        orderStatus: string;
    };
}

interface ProductDetails {
    productId: string;
    quantity: number;
    price: number;
    totalPrice: number;
}
const UserPayment = ({ orderId }: { orderId?: string }) => {
    const [orderStatus, setOrderStatus] = useState<OrderStatusResponse | null>(null);
    const [product, setProduct] = useState<ProductResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!orderId) return;

        const fetchOrderStatus = async () => {
            try {
                setLoading(true);
                const response: OrderStatusResponse = await verifyOrder(orderId);

                setOrderStatus(response);

                if (response?.data?.length > 0) {
                    const customerOrderId = response.data[0].customer_order_id;
                    const productResponse: ProductResponse = await getSingleOrder(customerOrderId);
                    setProduct(productResponse);
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(`Failed to verify order. ${err.message}`);
                } else {
                    setError("Failed to verify order. An unknown error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrderStatus();
    }, [orderId]);

    if (loading) return <LoadingPage />;
    if (error) return <p className="text-red-500">{error}</p>;
    return (
        <div className="p-6 rounded-lg shadow-lg mt-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
            <div className="flex justify-between">
                {/* Order Details */}
                <div className="mb-4">
                    <p><span className="font-semibold">Order ID:</span> {orderId}</p>
                    <p><span className="font-semibold">Transaction ID:</span> {orderStatus?.data[0]?.id || "N/A"}</p>
                    <p><span className="font-semibold">Amount:</span> {orderStatus?.data[0]?.amount} BDT</p>
                    <p><span className="font-semibold">Payment Status:</span>
                        <span className={orderStatus?.data[0]?.bank_status === "Success" ? "text-green-500" : "text-red-500"}>
                            {orderStatus?.data[0]?.bank_status}
                        </span>
                    </p>
                </div>

                {/* Product Details */}
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Product Details</h3>
                    <p><span className="font-semibold">Product Name:</span> {product?.data?.product?.productId || "N/A"}</p>
                    <p><span className="font-semibold">Quantity:</span> {product?.data?.product?.quantity || "N/A"}</p>
                    <p><span className="font-semibold">Price:</span> {product?.data?.product?.price || "N/A"} BDT</p>
                    <p><span className="font-semibold">Total Price:</span> {product?.data?.product?.totalPrice || "N/A"} BDT</p>
                </div>

                {/* Shipping & Order Status */}
                <div className="mb-4">
                    <p><span className="font-semibold">Shipping Address:</span> {product?.data?.shippingAddress || "Not Available"}</p>
                    <p><span className="font-semibold">Estimated Delivery Date:</span> {product?.data?.estimatedDeliveryDate ? new Date(product.data?.estimatedDeliveryDate).toLocaleDateString() : "N/A"}</p>
                    <p><span className="font-semibold">Order Status:</span> {product?.data?.orderStatus || "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default UserPayment;
