import React from 'react';

const About = () => {
    return (
        <div className="   dark:text-white pt-12">
            {/* Hero Section */}
            <div
                className="bg-cover bg-center h-96 relative"
                style={{ backgroundImage: 'url(https://res.cloudinary.com/dklikxmpm/image/upload/v1741324191/download_24_gzcagt.png)' }}
            >
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="text-center relative z-10 text-white p-8">
                    <h1 className="text-5xl font-semibold">About Us</h1>
                    <p className="text-lg">Discover a smarter way to buy and sell secondhand products.</p>
                </div>
            </div>

            {/* About Us Section */}
            <div className="max-w-6xl mx-auto p-6 md:p-12 text-center">
                <h2 className="text-4xl font-bold mb-4">About Us</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    We are a platform dedicated to providing the easiest way to buy and sell quality secondhand products.
                </p>
            </div>

            {/* Our Mission Section */}
            <div className="max-w-6xl mx-auto p-6 md:p-12 text-center bg-white dark:bg-gray-800">
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Our mission is to create a sustainable marketplace by offering an easy way for people to sell
                    and buy secondhand goods, reduce waste, and promote recycling.
                </p>
                <div className="space-y-4">
                    <div className="flex items-center justify-center">
                        <p className="text-gray-600 dark:text-gray-300">Our platform makes it easy for people to:</p>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-left text-gray-600 dark:text-gray-300">
                        <li>Buy quality secondhand products</li>
                        <li>Sell unwanted items for a great price</li>
                        <li>Reduce environmental impact through recycling</li>
                    </ul>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="max-w-6xl mx-auto p-6 md:p-12 text-center">
                <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    It&apos;s simple! Here’s how you can get started:
                </p>
                <ul className="list-decimal list-inside space-y-3 text-left text-gray-600 dark:text-gray-300">
                    <li>Browse our wide selection of secondhand products</li>
                    <li>List your unused items and reach potential buyers</li>
                    <li>Make transactions securely through our platform</li>
                </ul>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-gray-200 dark:bg-gray-700 py-12">
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="text-2xl font-semibold mb-6">Why Choose Us</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                            <h4 className="font-semibold text-lg text-gray-800 dark:text-white">Eco-Friendly</h4>
                            <p className="text-gray-600 dark:text-gray-300">Reduce waste by reusing quality products.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                            <h4 className="font-semibold text-lg text-gray-800 dark:text-white">Secure Transactions</h4>
                            <p className="text-gray-600 dark:text-gray-300">We ensure your buying and selling experience is safe and secure.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                            <h4 className="font-semibold text-lg text-gray-800 dark:text-white">Affordable Prices</h4>
                            <p className="text-gray-600 dark:text-gray-300">Buy and sell at affordable prices with no hidden fees.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div id="cta" className="max-w-6xl mx-auto text-center py-12">
                <h3 className="text-2xl font-bold mb-4">Join the Community</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Start buying and selling today! Join the thousands of users already using our platform.
                </p>
                <a href="/get-started">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform motion-safe:hover:scale-105">
                        Get Started
                    </button>
                </a>
            </div>
        </div>
    );
};

export default About;
