"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { HiCurrencyBangladeshi } from "react-icons/hi";
import { IProduct } from "@/types/product";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import MessageButton from "../message/MessageButton";

const ProductCard = ({ product }: { product: IProduct }) => {
    const isAvailable = product.status === "available";

    return (
        <Card className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 pt-0 transform hover:-translate-y-1">
            {/* Product Image */}
            <div className="relative h-52 w-full group">
                <Image
                    src={product.images[0]}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <CardContent className="p-4">
                {/* Seller Info */}
                <div className="flex items-center space-x-3 mb-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                        {product.userID.avatar ? (
                            <Image
                                src={product.userID.avatar}
                                alt={product.userID.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                    <p className="font-semibold text-sm text-gray-700">{product.userID.name}</p>
                </div>

                {/* Product Title */}
                <Link href={`/products/${product._id}`} className="block">
                    <h3 className="text-lg font-semibold  transition-colors">
                        {product.title}
                    </h3>
                </Link>

                {/* Price & Condition */}
                <div className="flex items-center justify-between mt-2">
                    <span className="text-xl font-bold  flex items-center gap-1">
                        <HiCurrencyBangladeshi className="w-5 h-5" /> {product.price}
                    </span>
                    <Badge variant="outline" className="text-xs font-medium">{product.condition}</Badge>
                </div>

                {/* Status */}
                <Badge
                    variant={isAvailable ? "secondary" : "destructive"}
                    className="mt-2 uppercase tracking-wide text-xs font-semibold px-2 py-1"
                >
                    {product.status}
                </Badge>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-4">
                    <Link href={`/products/${product._id}`}>
                        <Button variant="outline" size="sm">
                            <ShoppingCart className="w-4 h-4 mr-2" /> View Product
                        </Button>
                    </Link>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    {
                                        isAvailable ?
                                            <Link href={`checkout?productId=${product._id}`}>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={!isAvailable}
                                                    className={cn(
                                                        "transition-all flex items-center gap-2",
                                                        !isAvailable && "opacity-50 cursor-not-allowed"
                                                    )}
                                                >
                                                    <ShoppingCart className="w-4 h-4" /> Buy Now
                                                </Button>
                                            </Link>
                                            :
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={!isAvailable}
                                                className={cn(
                                                    "transition-all flex items-center gap-2",
                                                    !isAvailable && "opacity-50 cursor-not-allowed"
                                                )}
                                            >
                                                <ShoppingCart className="w-4 h-4" /> Buy Now
                                            </Button>

                                    }
                                </div>
                            </TooltipTrigger>
                            {!isAvailable && (
                                <TooltipContent>
                                    <p>This product is currently unavailable</p>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>

                    <MessageButton sellerId={product.userID._id} sellerAvatar={product.userID.avatar} sellerName={product.userID.name} />

                </div>
            </CardContent>
        </Card >
    );
};

export default ProductCard;
