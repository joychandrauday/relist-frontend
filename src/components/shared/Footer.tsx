import Image from 'next/image';
import React from 'react';

const Footer = () => {
    return (
        <div className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                {/* Grid layout: 1 column on small screens, 2 columns on medium, 4 columns on large */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* First Row */}
                    <div className="flex flex-col gap-3">
                        <Image
                            src={'/relistpng.png'}
                            alt="RELIST Logo"
                            width={260}
                            height={100}
                        />
                        <p className="text-sm">We are a company focused on delivering high-quality products to our customers. Our mission is to provide the best services.</p>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-gray-400">Home</a></li>
                            <li><a href="#" className="hover:text-gray-400">Shop</a></li>
                            <li><a href="#" className="hover:text-gray-400">About Us</a></li>
                            <li><a href="#" className="hover:text-gray-400">Contact</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-lg mb-4">Contact</h3>
                        <p className="text-sm">1234 Street Name, City, Country</p>
                        <p className="text-sm">Email: info@example.com</p>
                        <p className="text-sm">Phone: (123) 456-7890</p>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-gray-400">
                                <i className="fab fa-facebook"></i> Facebook
                            </a>
                            <a href="#" className="hover:text-gray-400">
                                <i className="fab fa-twitter"></i> Twitter
                            </a>
                            <a href="#" className="hover:text-gray-400">
                                <i className="fab fa-instagram"></i> Instagram
                            </a>
                        </div>
                    </div>
                </div>
                {/* Footer Bottom Row */}
                <div className="mt-8 text-center text-sm text-gray-400">
                    <p>&copy; 2025 Relist. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
