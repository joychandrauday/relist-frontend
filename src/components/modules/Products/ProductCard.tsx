"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { HiCurrencyBangladeshi } from "react-icons/hi";

const ProductCard = ({ product }) => {
    return (
        <Card className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 pt-0">
            {/* Product Images */}
            <div className="relative h-48 w-full">
                <Image
                    src={product.images[0]}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl"
                />
            </div>

            <CardContent className="p-4">
                {/* Seller Info */}
                <div className="flex items-center space-x-3 mb-4">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        {
                            product.userID.avatar ?
                                <Image
                                    src={product.userID.avatar} // fallback if no avatar
                                    alt={product.userID.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full"
                                />

                                : <></>
                        }
                    </div>
                    <p className="font-semibold text-sm text-gray-700">{product.userID.name}</p>
                </div>

                {/* Product Title */}
                <Link href={`/products/${product._id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{product.title}</h3>
                </Link>

                {/* Price & Condition */}
                <div className="flex items-center justify-between mt-2">
                    <span className="text-xl font-bold text-blue-600 flex items-center gap-2"><HiCurrencyBangladeshi />{product.price}</span>
                    <Badge className="text-xs font-medium">{product.condition}</Badge>
                </div>

                {/* Status */}
                <Badge variant={product.status === "available" ? "success" : "destructive"} className="mt-2">
                    {product.status}
                </Badge>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-4">
                    <Link href={`/products/${product._id}`}>
                        <Button variant="outline" size="sm">
                            <ShoppingCart className="w-4 h-4 mr-2" /> Buy Now
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon">
                        <MessageCircle className="w-5 h-5 text-gray-600" />
                    </Button>
                </div>
            </CardContent>
        </Card >
    );
};

export default ProductCard;
