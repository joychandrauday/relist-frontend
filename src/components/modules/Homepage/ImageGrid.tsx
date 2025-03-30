'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaShoppingBag } from "react-icons/fa";

const ImageGrid = () => {
    const router = useRouter();
    return (

        <section
            className="relative bg-fixed w-full py-16 px-6 md:px-12 flex items-center justify-center text-center bg-cover bg-no-repeat bg-center-right"
            style={{
                backgroundImage: "url(https://static.vecteezy.com/system/resources/previews/032/513/253/large_2x/flat-lay-ofgrapher-equipment-and-laptop-on-black-background-flat-lay-ofgrapher-s-desk-with-laptop-camera-and-accessories-ai-generated-free-photo.jpg)",
                height: '70vh'
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            <div className="relative  mx-auto  text-white space-y-6 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Banners */}
                <div className="grid grid-cols-2 gap-4 h-auto">
                    <Image
                        width={300}
                        height={300}
                        src="https://res.cloudinary.com/dklikxmpm/image/upload/v1742801747/consumer-electronics-ecommerce-digital-marketing-1536x864_dcfajc.jpg"
                        alt="Banner 1"
                        className="w-full h-72 object-cover rounded-lg shadow-lg"
                    />
                    <Image
                        width={300}
                        height={300}
                        src="https://res.cloudinary.com/dklikxmpm/image/upload/v1742801731/global-consumer-electronics_wyikyc.jpg"
                        alt="Banner 2"
                        className="w-full h-72 object-cover rounded-lg shadow-lg"
                    />
                </div>


                {/* Right Side - Text Content */}
                < div className="space-y-4 text-white text-center md:text-left">
                    <h2 className="text-2xl md:text-4xl font-bold">
                        Discover High-Quality Electronic Products
                    </h2>
                    <p className="text-sm md:text-base text-gray-300">
                        Explore our premium range of used electronics at reasonable prices to boost your productivity.
                    </p>
                    <button
                        onClick={() => router.push('/products?category=67c77170c437acdeb0b9419a')}
                        className="bg-[#FA8500] text-white px-6 py-3 flex items-center gap-2 rounded-lg transition duration-300 hover:bg-orange-600 mx-auto md:mx-0"
                    >
                        View All
                        <FaShoppingBag className="text-lg" />
                    </button>
                </div>
            </div>

        </section >
    );
};

export default ImageGrid;
