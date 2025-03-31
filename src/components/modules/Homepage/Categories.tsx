'use client';
import { getAllCategories } from "@/services/listings";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';  // Import Swiper styles
import 'swiper/css/autoplay'; // Import the autoplay module's styles if needed
import { Autoplay } from 'swiper/modules';
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

export interface ICategory {
    _id: string;
    name: string;
    description: string;
    icon: string;
}

const Categories = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="p-6 py-10">
            <div className="max-w-7xl mx-auto relative">
                {/* 🔹 Title */}
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Explore by Categories
                </h1>

                {/* 🔹 Category Swiper Carousel */}
                <Swiper
                    spaceBetween={20} // Space between slides
                    slidesPerView={5} // Number of slides visible at a time
                    autoplay={{
                        delay: 2500, // Autoplay every 2.5 seconds
                        disableOnInteraction: false, // Keep autoplay even after interaction
                    }}
                    loop={true} // Infinite loop of slides
                    modules={[Autoplay]} // Enable autoplay module
                    breakpoints={{
                        320: { // Mobile
                            slidesPerView: 1,
                        },
                        768: { // Tablet
                            slidesPerView: 2,
                        },
                        1024: { // Large Devices
                            slidesPerView: 4,
                        },
                    }}
                >
                    {categories?.map((category) => (
                        <SwiperSlide key={category._id}>
                            <Link href={`/products?category=${category._id}`}>
                                <div className="border shadow-lg rounded-lg overflow-hidden transform hover:-translate-y-1 transition duration-300 cursor-pointer p-4 flex flex-col items-center">
                                    {/* 📌 Category Info */}
                                    <div className="w-24 h-24 rounded-full overflow-hidden">
                                        <Image
                                            src={category.icon}
                                            alt={category.name}
                                            width={96}
                                            height={96}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <h2 className="text-xl font-semibold mt-2">{category.name}</h2>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                    <div className="z-50 absolute left-0 top-1/2 transform -translate-y-1/2 text-[#EA580C] p-2 rounded-full cursor-pointer">
                        <CircleChevronLeft className="swiper-button-prev text-[#EA580C]" size={20} />
                    </div>
                    <div className="z-50 absolute right-0 top-1/2 transform -translate-y-1/2  p-2 rounded-full cursor-pointer">
                        <CircleChevronRight className="swiper-button-next text-[#EA580C]" size={20} />
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default Categories;
