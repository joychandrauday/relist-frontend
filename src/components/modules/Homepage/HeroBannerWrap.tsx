'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { IProduct } from '@/types/product';
import ProductSlider from './HeroBannerSlider';
import { useRouter } from 'next/navigation';

const HeroBanner = ({ products }: { products: IProduct[] }) => {
    const router = useRouter();
    return (
        <section className="relative w-full md:h-[70vh] flex flex-col md:flex-row items-center justify-between py-12 px-6 md:px-20">
            {/* Left Side Content */}
            <div className="w-full md:w-1/2 space-y-6">
                <motion.h1
                    className="text-3xl md:text-6xl font-extrabold leading-tight"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Buy & Sell with <span className="text-orange-500">ReList</span>
                </motion.h1>
                <motion.p
                    className="text-lg text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Discover a smarter way to buy and sell second-hand products.
                    Get the best deals from verified sellers in your city.
                </motion.p>
                <motion.div
                    className="flex gap-4 flex-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 text-lg font-semibold w-full md:w-auto"
                        onClick={() => router.push('/products')}
                    >
                        Explore Now
                    </Button>
                    <Button variant="outline" className="border-gray-500 text-gray-300 hover:border-white w-full md:w-auto"
                        onClick={() => router.push('/user/dashboard/listing')}
                    >
                        Sell Your Product
                    </Button>
                </motion.div>
            </div>

            {/* Right Side Image */}
            <motion.div
                className="hidden md:flex w-full md:w-1/2 justify-center mt-6 md:mt-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <ProductSlider products={products} />
            </motion.div>
        </section>
    );
};

export default HeroBanner;
