import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { getAllListings } from '@/services/listings';
import React from 'react';

const Hero = async () => {
    const { data: listings } = await getAllListings('5', '');
    return (
        <div>
            <AnimatedTestimonials testimonials={listings?.listings} autoplay={true} />
        </div>
    );
}

export default Hero;
