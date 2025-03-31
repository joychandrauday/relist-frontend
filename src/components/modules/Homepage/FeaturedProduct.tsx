import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { getAllListings } from '@/services/listings';
import React from 'react';

const FeaturedProduct = async () => {
    const { data: listings } = await getAllListings('5', '');
    return (
        <div className="min-h-screen mx-auto text-white flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 bg-[#1F2937] px-4 sm:px-8">
            {/* Text Section */}
            <div className="featuredBannerText w-full md:w-1/2 text-center md:text-right">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">Discover our featured products</h1>
                <p className="text-lg sm:text-xl mt-2">
                    Explore our wide range of products and find the perfect fit for your home or office space.
                </p>
            </div>

            {/* Animated Testimonials Section */}
            <div className="w-full md:w-1/2">
                <AnimatedTestimonials testimonials={listings.listings} />
            </div>
        </div>

    );
}

export default FeaturedProduct;
