import { Cover } from '@/components/ui/cover';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className="wrap space-y-2">
                <h1 className="text-6xl font-bold text-red-500 text-center"><Cover>404</Cover></h1>
                <p className="text-2xl mt-4">Page not found</p>

                <Link href="/" className="text-sm text-black hover:text-gray-800">
                    <button className="px-8 py-2 border border-black bg-transparent text-black  dark:border-white relative group transition duration-200">
                        <div className="absolute -bottom-2 -right-2 bg-yellow-300 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200" />
                        <span className="relative">
                            Go back to home
                        </span>
                    </button>
                </Link>
            </div>
        </div >
    );
}

export default NotFound;
