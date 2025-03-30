'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/product";
import { HiCurrencyBangladeshi } from "react-icons/hi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CountDown from "../dashboard/flashsale/CountDown";
import { getAllFlashSale } from "@/services/flashSale";
import { ArrowRight, Tag, CircleChevronRight, CircleChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Grid = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllFlashSale();
                if ("data" in response) {
                    setProducts(response.data.slice(0, 4)); // Show only 4 products
                } else {
                    console.error("Unexpected response format:", response);
                }
            } catch (error) {
                console.error("Failed to fetch flash sale products", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="py-6 flex justify-center items-center">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 0.6 }}
                            className="text-orange-500"
                        >
                            🔥
                        </motion.span>
                        Flash Sale
                    </h1>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* First Three Columns - Product Slider */}
                    <div className="col-span-3 relative">
                        <Swiper
                            spaceBetween={10}
                            loop={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false, // Ensures autoplay continues even after interaction
                            }}
                            navigation={{
                                prevEl: ".swiper-button-prev", // Custom selector for previous button
                                nextEl: ".swiper-button-next", // Custom selector for next button
                            }}
                            modules={[Navigation]}
                            className="flex justify-center"
                            breakpoints={{
                                320: { // Mobile
                                    slidesPerView: 1,
                                },
                                768: { // Tablet
                                    slidesPerView: 2,
                                },
                                1024: { // Large Devices
                                    slidesPerView: 3,
                                },
                            }}
                        >
                            {products?.map((product) => (
                                <SwiperSlide key={product._id}>
                                    <Card className="shadow-md rounded-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full">
                                        <Link href={`/products/${product._id}`}>
                                            <div className="cursor-pointer group flex flex-col h-full">
                                                {/* Product Image */}
                                                <div className="relative h-40 w-full overflow-hidden">
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.title}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <Badge className="absolute top-2 left-2 bg-[#EA580C] text-white text-xs px-2 py-1 flex items-center gap-1">
                                                        <Tag size={12} />{" "}
                                                        {Math.round(
                                                            ((product.price - product.offerPrice) / product.price) * 100
                                                        )}
                                                        % OFF
                                                    </Badge>
                                                </div>

                                                {/* Product Info */}
                                                <CardContent className="p-3 text-center flex flex-col justify-between flex-grow">
                                                    <h2 className="text-sm font-semibold truncate">{product.title}</h2>

                                                    <div className="text-lg font-bold text-green-600 dark:text-green-400 flex justify-center items-center gap-1 mt-1">
                                                        <HiCurrencyBangladeshi className="w-4 h-4" /> {product.offerPrice}{" "}
                                                        <span className="text-xs line-through text-gray-500 dark:text-gray-400 ml-2">
                                                            {product.price}
                                                        </span>
                                                    </div>

                                                    {/* Status Badge */}
                                                    <Badge
                                                        variant={product.status === "available" ? "secondary" : "destructive"}
                                                        className="mt-1 text-xs font-medium uppercase px-2 py-1"
                                                    >
                                                        {product.status}
                                                    </Badge>

                                                    {/* View Details & Buy Button */}
                                                    <div className="flex gap-2 mt-3">
                                                        <Button variant="outline" className="w-1/2 text-xs px-2 py-1">
                                                            View
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </div>
                                        </Link>
                                    </Card>
                                </SwiperSlide>
                            ))}
                            {/* Custom Navigation Arrows */}
                            <div className="z-50 absolute left-0 top-1/2 transform -translate-y-1/2 text-[#EA580C] p-2 rounded-full cursor-pointer">
                                <CircleChevronLeft className="swiper-button-prev text-[#EA580C]" size={20} />
                            </div>
                            <div className="z-50 absolute right-0 top-1/2 transform -translate-y-1/2  p-2 rounded-full cursor-pointer">
                                <CircleChevronRight className="swiper-button-next text-[#EA580C]" size={20} />
                            </div>
                        </Swiper>

                    </div>

                    {/* Fourth Column - Countdown & Others */}
                    <div className="col-span-1">
                        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-md text-center h-full">
                            <h2 className="text-xl font-semibold mb-4">Limited Time Offer!</h2>
                            <CountDown />
                            <Button variant="secondary" className="mt-4 w-full bg-transparent border-2 border-[#FA8500] flex items-center gap-2 text-sm">
                                View All <ArrowRight size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Grid;
