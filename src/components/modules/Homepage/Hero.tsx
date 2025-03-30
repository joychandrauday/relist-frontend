
import { getAllListings } from '@/services/listings';
import React from 'react';
import HeroBanner from './HeroBannerWrap';

const Hero = async () => {
    const { data: listings } = await getAllListings('5', '');
    return (
        <div className=''>
            <HeroBanner products={listings.listings} />
        </div>
    );
}

export default Hero;
