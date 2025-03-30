import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { getAllListings } from '@/services/listings';
import React from 'react';

const FeaturedProduct = async () => {
    const { data: listings } = await getAllListings('5', '');
    return (
        <div className='min-h-screen  mx-auto text-white flex items-center justify-center md:flex-row gap-10 flex-col bg-[#1F2937]'>
            <div className="featuredBannerText w-1/2 text-right">
                <h1 className='text-6xl font-bold '>Discover our featured products</h1>
                <p className='text-xl '>
                    Explore our wide range of products and find the perfect fit for your home or office space.
                </p>
            </div>
            <div className="w-1/2">
                <AnimatedTestimonials testimonials={listings.listings} />
            </div>
        </div>
    );
}

export default FeaturedProduct;
