"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllListings } from "@/services/listings";
import { IProduct } from "@/types/product";
import { HiCurrencyBangladeshi } from "react-icons/hi";



const Grid = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await getAllListings('4', '');
                setProducts(data.listings);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };

        fetchCategories();
    }, []);
    return (
        <div className="min-h-screen  py-10">
            <div className="max-w-7xl mx-auto px-4">
                {/* 🔹 Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Featured Products
                </h1>

                {/* 🔹 Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products?.map((product) => (
                        <div
                            key={product._id}
                            className="shadow-lg bg-current rounded-xl overflow-hidden transform hover:-translate-y-2 transition duration-300"
                        >
                            <Link href={`/products/${product._id}`}>
                                <div className="cursor-pointer">
                                    {/* Product Image */}
                                    <Image
                                        src={product.images[0]}
                                        alt={product.title}
                                        width={300}
                                        height={200}
                                        className="w-full h-56 object-cover"
                                    />

                                    {/* Product Info */}
                                    <div className="p-4 text-center">
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {product.title}
                                        </h2>
                                        <div className="text-green-500 font-bold mt-2 flex items-center content-center">
                                            <HiCurrencyBangladeshi />{product.price}
                                        </div>

                                        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Grid;
