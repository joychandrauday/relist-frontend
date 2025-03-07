'use client'
import { getAllCategories } from "@/services/listings";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

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
        <div className="md:min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* 🔹 Title */}
                <h1 className="text-3xl font-bold  mb-6 text-center">
                    Explore Categories
                </h1>

                {/* 🔹 Category Marquee */}
                <Marquee gradient={false} speed={50} pauseOnHover={true}>
                    <div className="flex  space-x-6">
                        {categories?.map((category) => (
                            <Link href={`/products?category=${category.name}`} key={category._id}>
                                <div className="bg-current shadow-lg rounded-lg overflow-hidden transform hover:-translate-y-1 transition duration-300 cursor-pointer p-4 flex flex-col items-center w-60">
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
                                    <h2 className="text-xl font-semibold text-gray-800 mt-2">{category.name}</h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Marquee>
            </div>
        </div>
    );
};

export default Categories;
