import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { getAllListings } from '@/services/Profile';
import React from 'react';

const Hero = async () => {
    const { data: listings } = await getAllListings({
        page: 1,
        limit: 5,
    });
    console.log(listings);
    return (
        <div>
            <AnimatedTestimonials testimonials={listings} />
        </div>
    );
}

export default Hero;
