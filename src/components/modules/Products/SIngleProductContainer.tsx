'use client';

import React from 'react';
import ImageSlider from '../core/ImageSlider';
import MessageButton from "@/components/modules/message/MessageButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { addToWishlist } from "@/services/AuthService";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { IProduct } from '@/types/product';

const SIngleProductContainer = ({ product }: { product: IProduct }) => {
    const router = useRouter();

    const handleWishlist = async () => {
        try {
            const payload = { listingId: product._id };
            const res = await addToWishlist(payload);
            if (res.success) {
                toast.success('Added to wishlist!');
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    };

    const handleBuyNow = () => {
        router.push(`/checkout?productId=${product._id}`);
    };
    console.log(product);
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side - Image Slider */}
                <div className="w-full">
                    <ImageSlider images={product.images} />
                </div>

                {/* Right Side - Product Details */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="flex gap-4">
                        <p className={product.offerPrice ? "text-xl font-semibold text-green-600 line-through" : "text-xl font-semibold text-green-600"}>৳ {product.price}</p>
                        {product.offerPrice > 0 && (
                            <p className="text-lg text-red-500">৳ {product.offerPrice}</p>
                        )}
                    </div>
                    <p className="text-gray-500">Condition: {product.condition}</p>
                    <p className="text-gray-500">Category: {product.category.name}</p>
                    {product.location &&
                        <p className="text-gray-500">Location: {product.location?.city || 'dhaka'}, {product.location?.country || 'bangladesh'}</p>}
                    <p className="text-sm text-gray-400">Posted on: {new Date(product.createdAt).toLocaleDateString()}</p>

                    {/* Seller Info */}
                    <div className="flex items-center space-x-4 border p-3 rounded-lg shadow">
                        <Avatar>
                            <AvatarImage src={product.userID.avatar} />
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-semibold">{product.userID.name}</p>
                            <p className="text-sm text-gray-500">{product.userID.email}</p>
                        </div>
                        <MessageButton sellerId={product.userID._id} sellerName={product.userID.name} sellerAvatar={product.userID.avatar} />
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-4">
                        <Button
                            disabled={product.status === 'sold'}
                            onClick={handleBuyNow}
                            className={`${product.status === 'sold' ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FB8500] hover:bg-blue-700 text-white'} px-6 py-2 rounded-none shadow`}
                        >
                            {product.status === 'sold' ? 'Sold Out' : 'Buy Now'}
                        </Button>

                        <Button
                            onClick={handleWishlist}
                            className={`${product.status === 'sold' ? 'bg-gray-300 hover:bg-gray-400 text-black cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 text-black'} px-6 py-2 rounded-none shadow`}
                        >
                            {product.status === 'sold' ? 'Sold Out' : 'Add to Wishlist'}
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default SIngleProductContainer;
