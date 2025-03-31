/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { orderedProducts, incrementOrderQuantity, decrementOrderQuantity, removeItem, syncCartWithServer } from '@/redux/features/cartSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { createOrder, createTransaction } from '@/services/cart';
import { getAllListings } from '@/services/listings';
import { toast } from 'sonner';

const cities = [
    "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur", "Chattogram", "Chuadanga",
    "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj",
    "Jamalpur", "Jashore", "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram",
    "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj",
    "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali",
    "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira",
    "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];

const CartPage = () => {
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const products = useAppSelector(orderedProducts);
    useEffect(() => {
        const fetchLatestCartData = async () => {
            const response = await getAllListings(); // Fetch latest products
            const latestProducts = response.data.listings; // Update Redux state
            dispatch(syncCartWithServer(latestProducts)); // Update Redux state
        };

        fetchLatestCartData();

        const interval = setInterval(() => {
            fetchLatestCartData(); // Periodically update cart data
        }, 5000); // Every 10 seconds

        return () => clearInterval(interval);
    }, []);

    const [formData, setFormData] = useState({
        name: session?.user?.name || "",
        address: "",
        city: "",
        phone: ""
    });
    const [loading, setLoading] = useState(false);
    const [shippingCost, setShippingCost] = useState(0);

    const subtotal = products.reduce((acc, item) => acc + item.price * item.orderQuantity, 0);
    const total = subtotal + shippingCost;

    const updateQuantity = (id: string, type: "inc" | "dec") => {
        if (type === "inc") dispatch(incrementOrderQuantity(id));
        else dispatch(decrementOrderQuantity(id));
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCity = e.target.value;
        setFormData({ ...formData, city: selectedCity });

        if (selectedCity === "Dhaka") setShippingCost(100);
        else if (selectedCity === "Chattogram") setShippingCost(150);
        else setShippingCost(200);
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (products.map(product => (
            product.orderQuantity > product.quantity
        ))) {
            toast.error('the order quantity must not exceed item quantity!')
            return;
        }
        const orderInfo = {
            user: session?.user?.id,
            products: products.map(product => ({
                productId: product._id,
                quantity: product.orderQuantity,
                price: product.price,
                totalPrice: product.price * product.orderQuantity
            })),
            amount: total,
            shippingAddress: `${formData.address}, ${formData.city}`,
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
                    sellerID: products[0]?.userID,
                    orderID: response.data.payment.customer_order_id,
                    status: 'pending',
                    itemID: products.map((item) => item._id),
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
        <div className="p-4 sm:p-6 w-full mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Section */}
            <div className="shadow-md rounded-lg p-4 col-span-1 lg:col-span-2">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Shopping Cart</h2>
                {products.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    products.map((item) => (
                        <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between p-4 border-b">
                            <Image width={100} height={100} src={item.images?.[0] || "/placeholder.png"} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                            <div className="flex-1 text-center sm:text-left sm:ml-4">
                                <h3 className="font-semibold text-sm sm:text-base">{item.title}</h3>
                                <p className="text-gray-500 text-xs sm:text-sm">৳{item.price} | Quantity: {item.quantity}</p>
                            </div>
                            <div className="flex items-center mt-2 sm:mt-0">
                                <button onClick={() => updateQuantity(item._id, "dec")} className="px-2 sm:px-3 py-1 border rounded-l text-xs sm:text-sm" disabled={item.orderQuantity === 1}>-</button>
                                <span className="px-3 py-1 text-sm">{item.orderQuantity}</span>
                                <button onClick={() => updateQuantity(item._id, "inc")} className="px-2 sm:px-3 py-1 border rounded-r text-xs sm:text-sm" disabled={item.orderQuantity >= item.quantity}>+</button>
                            </div>
                            <button onClick={() => dispatch(removeItem(item._id))} className="text-red-500 ml-2 sm:ml-4 text-sm sm:text-base">
                                <FaTrashAlt />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Order Summary & Address */}
            <div className="shadow-md rounded-lg p-4 col-span-1">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Shipping Details</h2>

                <input type="text" name="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required className="w-full p-2 border rounded-lg mb-2 text-sm sm:text-base" placeholder="Enter your address" />

                <select name="city" value={formData.city} onChange={handleCityChange} required className="w-full p-2 border rounded-lg mb-2 text-sm sm:text-base">
                    <option value="" disabled>Select your city</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>

                <input type="text" name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="w-full p-2 border rounded-lg mb-4 text-sm sm:text-base" placeholder="Phone Number" />

                <p className="text-lg sm:text-xl">Subtotal: <span className="font-semibold">৳{subtotal.toFixed(2)}</span></p>
                <p className="text-lg sm:text-xl">Shipping Cost: <span className="font-semibold">৳{shippingCost}</span></p>
                <p className="text-lg sm:text-xl font-bold">Total: <span className="text-blue-500">৳{total.toFixed(2)}</span></p>

                <Button onClick={handleCheckout} disabled={loading || !formData.address || !formData.city || !formData.phone || !formData.name} className="w-full bg-[#FB8600] py-2 rounded-lg mt-4 text-sm sm:text-base">
                    {loading ? 'Processing...' : 'Confirm Order'}
                </Button>
            </div>
        </div>

    );
};

export default CartPage;
