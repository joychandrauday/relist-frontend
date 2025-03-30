"use client";
import React, { useState, useEffect } from "react";
import {  useSearchParams } from "next/navigation";
import { Search, X, Loader } from "lucide-react";

const placeholders = [
    "Search products...",
    "Find your favorite items...",
    "Looking for something special?",
    "Explore the best deals!",
];

const NavSearch = () => {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [placeholder, setPlaceholder] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state added

    useEffect(() => {
        const typeWriter = setTimeout(() => {
            if (!isDeleting && charIndex < placeholders[currentIndex].length) {
                setPlaceholder((prev) => prev + placeholders[currentIndex][charIndex]);
                setCharIndex(charIndex + 1);
            } else if (isDeleting && charIndex > 0) {
                setPlaceholder((prev) => prev.slice(0, -1));
                setCharIndex(charIndex - 1);
            } else {
                setIsDeleting(!isDeleting);
                if (!isDeleting) {
                    setTimeout(() => setIsDeleting(true), 1500);
                } else {
                    setCurrentIndex((prev) => (prev + 1) % placeholders.length);
                    setCharIndex(0);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(typeWriter);
    }, [charIndex, isDeleting, currentIndex]);

    const handleSearch = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsLoading(true); // Start loading

        const queryParams = new URLSearchParams(window.location.search);
        if (search) {
            queryParams.set("search", search);
        } else {
            queryParams.delete("search");
        }
        window.location.href = `/products?${queryParams.toString()}`;
    };

    return (
        <>
            {/* Search Button to Open Modal */}
            <button
                onClick={() => setIsModalOpen(true)}
                className=""
            >
                <Search size={20} />
            </button>

            {/* Search Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
                    <div className="relative bg-white p-6 w-[90%] max-w-md rounded-lg shadow-lg animate-fadeIn">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-black hover:text-red-600"
                        >
                            <X size={22} />
                        </button>

                        <form onSubmit={handleSearch} className="w-full flex flex-col items-center gap-4">
                            <input
                                type="text"
                                placeholder={placeholder}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-[40px] px-4 pl-5 text-lg font-mono text-black bg-white border-2 border-black rounded-none outline-none transition-all duration-300 shadow-[4px_4px_0px_#000] placeholder:text-gray-500 focus:bg-black focus:text-white focus:border-white focus:placeholder:text-white focus:ring-0 focus:animate-shake hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#000]"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-[#FB8600] text-white text-lg font-bold shadow-[4px_4px_0px_#000] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#000] flex justify-center items-center gap-2"
                            >
                                {isLoading ? (
                                    <Loader className="animate-spin" size={20} />
                                ) : (
                                    "Search"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavSearch;
