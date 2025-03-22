"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const placeholders = [
    "Search products...",
    "Find your favorite items...",
    "Looking for something special?",
    "Explore the best deals!",
];

const NavSearch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [placeholder, setPlaceholder] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const handleSearch = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const queryParams = new URLSearchParams(window.location.search);
        if (search) {
            queryParams.set("search", search);
        } else {
            queryParams.delete("search");
        }
        router.push(`/products?${queryParams.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-[320px] flex">
            <input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-[40px] px-4 pl-5 text-lg font-mono text-black bg-white border-2 border-black rounded-none outline-none transition-all duration-300 shadow-[8px_8px_0px_#000] placeholder:text-gray-500 focus:bg-black focus:text-white focus:border-white focus:placeholder:text-white focus:ring-0 focus:animate-shake hover:-translate-x-[4px] hover:-translate-y-[4px] hover:shadow-[12px_12px_0px_#000]"
            />
            <button>
                <Search type="submit" className="btn absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-800 hover:text-[#FB8600]" size={22} />
            </button>

        </form>
    );
};

export default NavSearch;
