"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiCurrencyBangladeshi } from "react-icons/hi";
import { IProduct } from "@/types/product";
import MessageButton from "../message/MessageButton";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }: { product: IProduct }) => {
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
                    <p className="font-semibold text-sm">{product.userID.name}</p>
                </div>

                {/* Product Title */}
                <Link href={`/products/${product._id}`}>
                    <h3 className="text-lg font-semibold  truncate">{product.title}</h3>
                </Link>

                {/* Price & Condition */}
                <div className="flex items-center justify-between mt-2">
                    <span className="text-xl font-bold text-blue-600 flex items-center gap-2"><HiCurrencyBangladeshi />{product.price}</span>
                    <Badge className="text-xs font-medium">{product.condition}</Badge>
                </div>

                {/* Status */}
                <Badge variant={product.status === "available" ? "secondary" : "destructive"} className="mt-2">
                    {product.status}
                </Badge>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-4">
                    <Link href={`/products/${product._id}`}>
                        <Button variant="outline" size="sm">
                            <ShoppingCart className="w-4 h-4 mr-2" /> View Details
                        </Button>
                    </Link>
                    <Link href={`/checkout/${product._id}`}>
                        <Button variant="outline" size="sm">
                            <ShoppingCart className="w-4 h-4 mr-2" /> Buy Now
                        </Button>
                    </Link>
                    <MessageButton sellerId={product.userID._id} sellerName={product.userID.name} sellerAvatar={product.userID.avatar} />
                </div>
            </CardContent>
        </Card >
    );
};

export default ProductCard;
