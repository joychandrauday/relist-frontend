/* eslint-disable @typescript-eslint/no-unused-vars */
import Aos from 'aos';
import { useEffect, useState } from 'react';
import { TbCategory } from 'react-icons/tb';
import { getAllCategories } from '@/services/listings';
import Image from 'next/image';
import { ICategory } from '../modules/Products/ProductFilter';

const CategoriesDropdown = () => {
    const [categories, setCategories] = useState<ICategory[]>([])
    useEffect(() => {
        Aos.init({ duration: 800, offset: 100 });
    }, []);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.log('Failed to fetch categories');
            }
        };

        fetchCategories();
    }, []);



    return (
        <div className="relative group z-50 rounded-none">
            <div
                className="hover:text-primary-foreground cursor-pointer group flex items-center gap-2 transition duration-200"
            >
                <TbCategory size={20} />
                Browse By Category
            </div>
            <div
                className="absolute top-full left-0  backdrop-blur-xl rounded-lg shadow-lg py-2 w-48 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 pointer-events-none border group-hover:pointer-events-auto"
                data-aos="fade-down"
            >
                <ul>
                    {categories.map((category, index) => (
                        <li key={category.name}>
                            <a
                                href={`/products?category=${category._id}`}
                                className="flex shadow items-center gap-3 px-4 py-2 hover:bg-[#F98700] transition duration-200"
                                data-aos="fade-right"
                                data-aos-delay={`${(index + 1) * 100}`}
                            >
                                <Image
                                    src={category.icon}
                                    alt={category.name}
                                    width={20}
                                    height={20}
                                />
                                {category.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    );
};

export default CategoriesDropdown;
