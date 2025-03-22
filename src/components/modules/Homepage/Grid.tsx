"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllListings } from "@/services/listings";
import { IProduct } from "@/types/product";
import { HiCurrencyBangladeshi } from "react-icons/hi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


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
                <h1 className="text-3xl font-bold  mb-6 text-center">
                    Featured Products
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products?.map((product) => (
                        <Card
                            key={product._id}
                            className="shadow-lg rounded-xl overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                        >
                            <Link href={`/products/${product._id}`}>
                                <div className="cursor-pointer group">
                                    {/* Product Image */}
                                    <div className="relative h-56 w-full ">
                                        <Image
                                            src={product.images[0]}
                                            alt={product.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <CardContent className="p-4 text-center">
                                        <h2 className="text-lg font-semibold  truncate hover:text-blue-600 transition-colors">
                                            {product.title}
                                        </h2>

                                        <div className="text-xl font-bold text-green-500 flex justify-center items-center gap-1 mt-2">
                                            <HiCurrencyBangladeshi className="w-5 h-5" /> {product.price}
                                        </div>

                                        {/* Status Badge */}
                                        <Badge
                                            variant={product.status === "available" ? "secondary" : "destructive"}
                                            className="mt-2 text-xs font-medium uppercase px-2 py-1"
                                        >
                                            {product.status}
                                        </Badge>

                                        {/* View Details Button */}
                                        <Button variant="outline" className="mt-4 w-full">
                                            View Details
                                        </Button>
                                    </CardContent>
                                </div>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Grid;
