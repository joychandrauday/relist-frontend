import React from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getSingleProduct } from '@/services/listings';
import Image from 'next/image';
import CheckoutForm from '@/components/modules/Products/CheckOutForm';

interface CheckoutPageProps {
    searchParams: Promise<Record<string, string | undefined>>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
    const params = await searchParams;
    const productId = params.productId;
    if (!productId) {
        return <div className="text-red-500">Product ID is missing.</div>;
    }
    const { data: product } = await getSingleProduct(productId);
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            {/* Product details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <Image
                        width={640}
                        height={480}
                        src={product.images[0] || '/default-image.jpg'}
                        alt={product.title}
                        className="w-full h-auto"
                    />
                </div>
                <div>
                    <h2 className="text-2xl font-semibold">{product.title}</h2>
                    <p className="text-gray-500">{product.description}</p>
                    <p className="text-xl font-semibold text-green-600">৳{product.price}</p>

                    <div className="flex items-center space-x-4 border p-3 rounded-lg shadow mt-4">
                        <Avatar>
                            <AvatarImage src={product.userID.avatar} />
                        </Avatar>
                        <div>
                            <p className="font-semibold">{product.userID.name}</p>
                            <p className="text-sm text-gray-500">{product.userID.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkout Form */}
            <CheckoutForm product={product} />
        </div>
    );
}
