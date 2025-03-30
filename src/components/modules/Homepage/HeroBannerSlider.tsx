"use client";
import React from "react";
import { IProduct } from "@/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import MessageButton from "../message/MessageButton";

const ProductSlider = ({ products }: { products: IProduct[] }) => {
    const router = useRouter();
    return (
        <div className="relative w-full h-[300px] flex flex-col items-center overflow-hidden">
            {/* Main Swiper - Continuous Vertical Scroll */}

            <Marquee speed={2000} pauseOnHover vertical className="[--duration:20s]">
                {products.map((product) => (
                    <div key={product._id}
                        // Add dark border on hover
                        className={cn(
                            "relative flex items-center gap-4 p-4 rounded-xl shadow-lg bg-white/10 backdrop-blur-lg hover:border-[#F97316] hover:border-2 text-white border border-white/20 w-full",
                            // light styles
                            "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] hover:border-gray-950",
                            // dark styles
                            "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] dark:hover:border-[#F97316] ",
                        )}
                    >
                        {/* Image Section */}
                        <div className="w-20 h-20 flex-shrink-0">
                            <Image
                                src={product.images[0]}
                                width={80}
                                height={80}
                                alt={product.title}
                                className="w-full h-full object-cover rounded-lg shadow-md"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold truncate">{product.title}</h2>
                            <p className="text-sm text-orange-400 font-bold">{product.price} BDT</p>
                            <p className="text-xs text-gray-300">Seller: {product.userID.name}</p>
                        </div>

                        {/* Button */}
                        <button
                            className="px-4 py-1 text-sm bg-orange-500 hover:bg-orange-600 rounded-lg transition duration-300"
                            onClick={() => router.push(`/products/${product._id}`)}
                        >
                            View
                        </button>
                        <MessageButton sellerId={product.userID._id} sellerName={product.userID.name} sellerAvatar={product.userID.avatar} />

                    </div>
                ))}
            </Marquee>
            <div className="pointer-events-none w-full absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
            <div className="pointer-events-none w-full absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
        </div>
    );
};

export default ProductSlider;
