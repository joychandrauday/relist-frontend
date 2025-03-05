/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllCategories } from "@/services/listings";

const conditionOptions = [
    "Brand New", "Like New", "Excellent", "Very Good", "Good", "Fair", "Refurbished", "For Parts / Not Working"
];

const districtsOfBangladesh = [
    "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];
// Define ICategory interface
export interface ICategory {
    _id: string;
    name: string;
    description: string;
    icon: string;
}

const ProductFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [categories, setCategories] = useState<ICategory[]>([])

    const [filters, setFilters] = useState({
        minPrice: searchParams.get('minPrice') || "",
        maxPrice: searchParams.get('maxPrice') || "",
        search: searchParams.get('search') || "",
        status: searchParams.get('status') || "",
        condition: searchParams.get('condition') || "",
        city: searchParams.get('city') || "",
        category: searchParams.get('category') || "",
    });

    useEffect(() => {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) queryParams.set(key, value);
        });

        router.push(`?${queryParams.toString()}`);
    }, [filters, router]);
    useEffect(() => {
        // Define an async function to fetch data
        const fetchCategories = async () => {
            try {
                // Assuming getAllCategories() returns a promise
                const { data } = await getAllCategories();
                setCategories(data);  // Set categories data to state
            } catch (error) {
                console.log('Failed to fetch categories'); // Handle error
            }
        };

        fetchCategories();  // Call the async function

    }, []);
    const handleChange = (e) => {
        setFilters(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleResetFilters = () => {
        setFilters({
            minPrice: "",
            maxPrice: "",
            search: "",
            status: "",
            condition: "",
            city: "",
            category: "",
        });
        router.push("/products");
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-none mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

                {/* Search Input */}
                <div className="flex flex-col">
                    <Label htmlFor="search">Search</Label>
                    <Input
                        id="search"
                        name="search"
                        value={filters.search}
                        onChange={handleChange}
                        placeholder="Search for products"
                    />
                </div>

                <div className="flex flex-col ">
                    <Label htmlFor="priceRange">Price Range</Label>
                    <div className="flex justify-between">
                        <span>৳ {filters.minPrice}</span>
                        <span>৳ {filters.maxPrice}</span>
                    </div>
                    <input
                        type="range"
                        id="priceRange"
                        name="priceRange"
                        min="0"
                        max="100000"
                        step="1000"
                        value={filters.minPrice || 0}
                        onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                        className="w-full mt-2"
                    />
                    <input
                        type="range"
                        id="priceRangeMax"
                        name="priceRangeMax"
                        min="0"
                        max="100000"
                        step="1000"
                        value={filters.maxPrice || 100000}
                        onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                        className="w-full mt-2"
                    />
                </div>

                {/* category  Dropdown */}
                <div className="flex flex-col">
                    <Label htmlFor="category">Category</Label>
                    <select
                        id="category"
                        name="category"
                        value={filters.category}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                {/* Status Dropdown */}
                <div className="flex flex-col">
                    <Label htmlFor="status">Status</Label>
                    <select
                        id="status"
                        name="status"
                        value={filters.status}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                    >
                        <option value="">All</option>
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                    </select>
                </div>

                {/* Condition Dropdown */}
                <div className="flex flex-col">
                    <Label htmlFor="condition">Condition</Label>
                    <select
                        id="condition"
                        name="condition"
                        value={filters.condition}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                    >
                        <option value="">Select Condition</option>
                        {conditionOptions.map((condition) => (
                            <option key={condition} value={condition}>{condition}</option>
                        ))}
                    </select>
                </div>

                {/* City Dropdown */}
                <div className="flex flex-col">
                    <Label htmlFor="city">City</Label>
                    <select
                        id="city"
                        name="city"
                        value={filters.city}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                    >
                        <option value="">Select City</option>
                        {districtsOfBangladesh.map((district) => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Reset Button */}
            <div className="flex mt-6">
                <Button onClick={handleResetFilters} className="bg-gray-500 text-white w-full md:w-auto">
                    Reset Filters
                </Button>
            </div>
        </div>
    );
};

export default ProductFilter;
