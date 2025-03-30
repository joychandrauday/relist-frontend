'use client';

import { Truck, ShieldCheck, Tag, Headphones } from "lucide-react";

const OurService = () => {
    return (
        <section className="w-full py-20  text-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">

                    {/* 🚚 Fast & Reliable Delivery */}
                    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg hover:shadow-lg transition-all duration-300">
                        <Truck className="w-12 h-12 text-blue-400" />
                        <h3 className="text-lg font-semibold mt-4">Fast & Reliable Delivery</h3>
                        <p className="text-gray-400 text-sm mt-2">Get your orders delivered quickly and safely.</p>
                    </div>

                    {/* 🔒 Secure Payments */}
                    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg hover:shadow-lg transition-all duration-300">
                        <ShieldCheck className="w-12 h-12 text-green-400" />
                        <h3 className="text-lg font-semibold mt-4">Secure Payments</h3>
                        <p className="text-gray-400 text-sm mt-2">100% payment protection on all orders.</p>
                    </div>

                    {/* 🏷️ Exclusive Discounts */}
                    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg hover:shadow-lg transition-all duration-300">
                        <Tag className="w-12 h-12 text-yellow-400" />
                        <h3 className="text-lg font-semibold mt-4">Exclusive Discounts</h3>
                        <p className="text-gray-400 text-sm mt-2">Save more with our amazing deals & offers.</p>
                    </div>

                    {/* 🎧 24/7 Customer Support */}
                    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg hover:shadow-lg transition-all duration-300">
                        <Headphones className="w-12 h-12 text-purple-400" />
                        <h3 className="text-lg font-semibold mt-4">24/7 Customer Support</h3>
                        <p className="text-gray-400 text-sm mt-2">Need help? We&apos;re always here for you.</p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default OurService;
