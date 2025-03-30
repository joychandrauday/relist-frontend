"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Tag } from "lucide-react";
import Link from "next/link";
import { HiCurrencyBangladeshi } from "react-icons/hi";
import { IProduct } from "@/types/product";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import MessageButton from "../message/MessageButton";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addProduct, orderedProducts } from "@/redux/features/cartSlice";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: IProduct }) => {
    console.log(product)
    const isAvailable = product.status === "available";
    const dispatch = useAppDispatch();
    const products = useAppSelector(orderedProducts);
    const orderQuantity = products.find((p) => p._id === product._id)?.orderQuantity || 0;

    const handleAddCart = (product: IProduct) => {
        dispatch(addProduct(product));
        toast.success(`${product.title} added to cart!`);
    };

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
                {
                    product.offerPrice > 0 && 
                    <Badge className="absolute top-2 left-2 bg-[#EA580C] text-white text-xs px-2 py-1 flex items-center gap-1">
                        <Tag size={12} />{" "}
                        {Math.round(
                            ((product.price - product.offerPrice) / product.price) * 100
                        )}
                        % OFF
                    </Badge>
                }
            </div>

            <CardContent className="p-4">
                {/* Seller Info */}
                <div className="flex items-center space-x-3 mb-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                        {product.userID.avatar && (
                            <Image
                                src={product.userID.avatar}
                                alt={product.userID.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        )}
                    </div>
                    <p className="font-semibold text-sm text-gray-700">{product.userID.name}</p>
                </div>

                {/* Product Title */}
                <Link href={`/products/${product._id}`} className="block">
                    <h3 className="text-lg font-semibold transition-colors">{product.title}</h3>
                </Link>

                {/* Price & Condition */}
                <div className="flex items-center justify-between mt-2">
                    {
                        product.offerPrice > 0 ?
                            <div className="wrap flex text-xl font-bold items-center gap-1">
                                <HiCurrencyBangladeshi className="w-4 h-4" /> {product.offerPrice}{" "}
                                <span className="text-xs line-through text-gray-500 dark:text-gray-400 ml-2">
                                    {product.price}
                                </span>
                            </div> :
                            <span className="text-xl font-bold flex items-center gap-1">
                                <HiCurrencyBangladeshi className="w-5 h-5" /> {product.price}
                            </span>
                    }
                    <Badge variant="outline" className="text-xs font-medium">{product.condition}</Badge>
                </div>

                <div className="flex justify-between">
                    {/* Status */}
                    <Badge
                        variant={isAvailable ? "secondary" : "destructive"}
                        className="mt-2 uppercase tracking-wide text-xs font-semibold px-2 py-1"
                    >
                        {product.status}
                    </Badge>
                    <Badge
                        variant={product.quantity > 0 ? "secondary" : "destructive"}
                        className="mt-2 uppercase tracking-wide text-xs font-semibold px-2 py-1"
                    >
                        quantity:   {product.quantity}
                    </Badge>
                </div>

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
                                    <Button
                                        onClick={() => handleAddCart(product)}
                                        variant="outline"
                                        size="sm"
                                        disabled={!isAvailable || orderQuantity >= product.quantity}
                                        className={cn(
                                            "transition-all flex items-center gap-2",
                                            (!isAvailable || orderQuantity >= product.quantity) && "opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        <ShoppingCart className="w-4 h-4" /> Add to cart
                                    </Button>
                                </div>
                            </TooltipTrigger>
                            {!isAvailable || orderQuantity >= product.quantity ? (
                                <TooltipContent>
                                    <p>{!isAvailable ? "This product is currently unavailable" : "already added to cart."}</p>
                                </TooltipContent>
                            ) : null}
                        </Tooltip>
                    </TooltipProvider>

                    <MessageButton sellerId={product.userID._id} sellerAvatar={product.userID.avatar} sellerName={product.userID.name} />
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
