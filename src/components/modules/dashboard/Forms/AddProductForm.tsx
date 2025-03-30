/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { addListing, getAllCategories } from "@/services/listings";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type ProductFormInputs = {
    title: string;
    description: string;
    price: number;
    condition: string;
    category: string;
    status: string;
    city: string;
    state?: string;
    country: string;
    images: FileList;
    quantity: number;
};

const conditionOptions = [
    "Brand New", "Like New", "Excellent", "Very Good", "Good", "Fair", "Refurbished", "For Parts / Not Working"
];

const statusOptions = ["available", "sold"];

const districtsOfBangladesh = [
    "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];
const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormInputs>();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const uploadImages = async (files: FileList): Promise<string[]> => {
        const uploadedImages: string[] = [];
        if (files.length === 0) {
            throw new Error('At least one image is required');
        }

        for (const file of Array.from(files)) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append('upload_preset', 'product_images');
            formData.append('cloud_name', 'dklikxmpm');

            const res = await fetch("https://api.cloudinary.com/v1_1/dklikxmpm/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                uploadedImages.push(data.secure_url);
            } else {
                throw new Error('Failed to upload image to Cloudinary');
            }
        }

        return uploadedImages;
    };

    const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
        setLoading(true);
        try {
            const imageLinks = await uploadImages(data.images);

            const listingData = {
                title: data.title,
                description: data.description,
                price: Number(data.price),
                condition: data.condition,
                category: data.category,
                images: imageLinks,
                status: data.status,
                location: {
                    city: data.city,
                    state: data.state || "",
                    country: data.country
                },
                quantity: data.quantity

            };

            const response = await addListing(listingData);
            if (response.success) {
                toast.success('Product added successfully!');
                reset();
            } else {
                throw new Error('Failed to add product');
            }
        } catch (error) {
            toast.error('Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-5xl mx-auto shadow-md rounded-md space-y-4  dark:bg-gray-900">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center">Add Product</h2>

            {/* Title */}
            <div>
                <Label>Title</Label>
                <Input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="w-full mt-1 p-2 border rounded-md"
                />
                {errors.title && <span className="text-red-500">{errors.title.message}</span>}
            </div>

            {/* Description */}
            <div>
                <Label>Description</Label>
                <Textarea
                    {...register("description", { required: "Description is required" })}
                    className="w-full mt-1 p-2 border rounded-md"
                />
                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
            </div>

            {/* Grid Layout for Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                {/* Price */}
                <div>
                    <Label>Price (BDT)</Label>
                    <Input
                        type="number"
                        {...register("price", { required: "Price is required" })}
                        className="w-full mt-1 p-2 border rounded-md"
                    />
                    {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                </div>
                {/* Price */}
                <div>
                    <Label>Quantity</Label>
                    <Input
                        type="number"
                        {...register("quantity", { required: "quantity is required" })}
                        className="w-full mt-1 p-2 border rounded-md"
                    />
                    {errors.quantity && <span className="text-red-500">{errors.quantity.message}</span>}
                </div>

                {/* Condition */}
                <div>
                    <Label>Condition</Label>
                    <select
                        {...register("condition", { required: "Condition is required" })}
                        className="w-full mt-1 p-2 border rounded-md"
                    >
                        {conditionOptions.map((option, idx) => (
                            <option key={idx} value={option}>{option}</option>
                        ))}
                    </select>
                    {errors.condition && <span className="text-red-500">{errors.condition.message}</span>}
                </div>

                {/* Category */}
                <div>
                    <Label>Category</Label>
                    <select
                        {...register("category", { required: "Category is required" })}
                        className="w-full mt-1 p-2 border rounded-md"
                    >
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                    {errors.category && <span className="text-red-500">{errors.category.message}</span>}
                </div>

                {/* Status */}
                <div>
                    <Label>Status</Label>
                    <select
                        {...register("status", { required: "Status is required" })}
                        className="w-full mt-1 p-2 border rounded-md"
                    >
                        {statusOptions.map((option, idx) => (
                            <option key={idx} value={option}>{option}</option>
                        ))}
                    </select>
                    {errors.status && <span className="text-red-500">{errors.status.message}</span>}
                </div>

                {/* City */}
                <div>
                    <Label>City</Label>
                    <select
                        {...register("city", { required: "City is required" })}
                        className="w-full mt-1 p-2 border rounded-md"
                    >
                        {districtsOfBangladesh.map((city, idx) => (
                            <option key={idx} value={city}>{city}</option>
                        ))}
                    </select>
                    {errors.city && <span className="text-red-500">{errors.city.message}</span>}
                </div>

                {/* Country */}
                <div>
                    <Label>Country</Label>
                    <Input
                        type="text"
                        defaultValue="Bangladesh"
                        {...register("country", { required: "Country is required" })}
                        readOnly
                        className="w-full mt-1 p-2 border rounded-md"
                    />
                </div>
            </div>

            {/* Image Upload */}
            <div>
                <Label>Upload Images</Label>
                <Input
                    type="file"
                    multiple
                    accept="image/*"
                    {...register("images", { required: "At least one image is required" })}
                    className="w-full mt-1 p-2 border rounded-md"
                />
                {errors.images && <span className="text-red-500">{errors.images.message}</span>}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => reset()}
                    disabled={loading}
                    className="w-full sm:w-auto"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto"
                >
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>

    );
};

export default AddProduct;
