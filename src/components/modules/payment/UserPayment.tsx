'use client'
import { getSingleOrder, verifyOrder } from "@/services/cart";
// import { verifyOrder } from '@/services/cart';
// import { useEffect } from 'react';
// import { toast } from 'sonner';
// import Swal from 'sweetalert2';

// const UserPayment = ({ orderId }) => {
//     const { data } = verifyOrder(orderId)

//     const payment = data?.data?.[0] || null;
//     console.log(orderId);
//     useEffect(() => {
//         if (data?.data?.length > 0) {
//             Swal.fire({
//                 title: "Payment Confirmation!",
//                 text: `your payment attempt was ${payment.bank_status}`,
//                 icon: "info",
//                 confirmButtonText: "OK",
//                 confirmButtonColor: "#3085d6",
//             }).then(async (result) => {
//                 if (result.isConfirmed) {
//                     try {
//                         const payment = data?.data?.[0];
//                         if (payment?.customer_order_id) {
//                             const updatedData = {
//                                 paymentStatus: payment.bank_status === "Success" ? "Completed" : "Failed",
//                                 orderStatus: payment.bank_status === "Success" ? "Processing" : "Pending",
//                             };
//                             console.log(updatedData);
//                             // await updateWholeOrder({ orderId: payment.customer_order_id, updatedData });
//                             // toast.success("Order placed successfully!");
//                         }
//                     } catch (error) {
//                         console.error("Error updating order:", error);
//                         toast.error("Failed to update order");
//                     }
//                 }
//             });
//         }
//     }, [data, payment.bank_status]);

//     // if (isLoading) {
//     //     return <div className="text-center text-lg font-semibold">Loading...</div>;
//     // }

//     // if (!data || !data.data || data.data.length === 0) {
//     //     return <div className="text-center text-red-500 text-lg font-semibold">No payment data found</div>;
//     // }


//     return (
//         <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-lg bg-white">
//             <h2 className="text-2xl font-bold mb-4 text-primary">Payment Details</h2>

//             {/* <div className="grid grid-cols-2 text-black gap-4">
//                 <p><span className="font-semibold">Order ID:</span> {payment.order_id}</p>
//                 <p><span className="font-semibold">Transaction ID:</span> {payment.bank_trx_id}</p>
//                 <p><span className="font-semibold">Amount:</span> {payment.amount} BDT</p>
//                 <p><span className="font-semibold">Payable Amount:</span> {payment.payable_amount} BDT</p>
//                 <p><span className="font-semibold">Method:</span> {payment.method}</p>
//                 <p><span className="font-semibold">Payment Status:</span>
//                     <span className={payment.bank_status === "Success" ? "text-green-500" : "text-red-500"}>
//                         {payment.bank_status}
//                     </span>
//                 </p>
//             </div> */}

//             <div className="mt-6">
//                 <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
//                     Download Invoice
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default UserPayment;

import React, { useEffect, useState } from "react";

const UserPayment = ({ orderId }: { orderId?: string }) => {
    const [orderStatus, setOrderStatus] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!orderId) return;
        const fetchOrderStatus = async () => {
            try {
                setLoading(true);
                const response = await verifyOrder(orderId);
                setOrderStatus(response);
                const { data: product } = await getSingleOrder(orderStatus?.data[0].customer_order_id)
                setProduct(product)
            } catch (err) {
                setError("Failed to verify order.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderStatus();
    }, []);
    console.log(product, 'got it');
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
            <div className="flex justify-between ">
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
                    <p><span className="font-semibold">Product Name:</span> {product?.product?.productId}</p>
                    <p><span className="font-semibold">Quantity:</span> {product?.product?.quantity}</p>
                    <p><span className="font-semibold">Price:</span> {product?.product?.price} BDT</p>
                    <p><span className="font-semibold">Total Price:</span> {product?.product?.totalPrice} BDT</p>
                </div>

                {/* Shipping & Order Status */}
                <div className="mb-4">
                    <p><span className="font-semibold">Shipping Address:</span> {product?.shippingAddress || "Not Available"}</p>
                    <p><span className="font-semibold">Estimated Delivery Date:</span> {new Date(product?.estimatedDeliveryDate).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Order Status:</span> {product?.orderStatus}</p>
                </div>
            </div>
        </div>
    );
};

export default UserPayment;
