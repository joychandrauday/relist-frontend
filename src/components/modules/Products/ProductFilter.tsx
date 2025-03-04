'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";

const conditionOptions = [
    "Brand New", "Like New", "Excellent", "Very Good", "Good", "Fair", "Refurbished", "For Parts / Not Working"
];

const districtsOfBangladesh = [
    "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];

const ProductFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        minPrice: searchParams.get('minPrice') || "",
        maxPrice: searchParams.get('maxPrice') || "",
        search: searchParams.get('search') || "",
        status: searchParams.get('status') || "",
        condition: searchParams.get('condition') || "",
        city: searchParams.get('city') || "",
    });

    // ফিল্টার পরিবর্তন হলে URL আপডেট হবে
    useEffect(() => {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) queryParams.set(key, value);
        });

        router.push(`?${queryParams.toString()}`);
    }, [filters, router]);

    // ইনপুট পরিবর্তন হ্যান্ডলিং
    const handleChange = (e) => {
        setFilters(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // ফিল্টার রিসেট করলে URL ক্লিয়ার হবে
    const handleResetFilters = () => {
        setFilters({
            minPrice: "",
            maxPrice: "",
            search: "",
            status: "",
            condition: "",
            city: "",
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

                {/* Min Price */}
                <div className="flex flex-col">
                    <Label htmlFor="minPrice">Min Price</Label>
                    <Input
                        id="minPrice"
                        name="minPrice"
                        type="number"
                        value={filters.minPrice}
                        onChange={handleChange}
                        placeholder="Min Price"
                    />
                </div>

                {/* Max Price */}
                <div className="flex flex-col">
                    <Label htmlFor="maxPrice">Max Price</Label>
                    <Input
                        id="maxPrice"
                        name="maxPrice"
                        type="number"
                        value={filters.maxPrice}
                        onChange={handleChange}
                        placeholder="Max Price"
                    />
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
