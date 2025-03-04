'use client';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { addListing, getAllCategories } from "@/services/listings";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { revalidateProductTag } from "@/lib/revalidateProductTag";

const conditionOptions = [
    "Brand New", "Like New", "Excellent", "Very Good", "Good", "Fair", "Refurbished", "For Parts / Not Working"
];
const districtsOfBangladesh = [
    "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];
const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([false]);
    useEffect(() => {
        // Define an async function to fetch data
        const fetchCategories = async () => {
            try {
                // Assuming getAllCategories() returns a promise
                const { data } = await getAllCategories();
                setCategories(data);  // Set categories data to state
            } catch (error) {
                console.log('Failed to fetch categories'); // Handle error
            } finally {
                setLoading(false);  // Stop loading once the request is complete
            }
        };

        fetchCategories();  // Call the async function

    }, []);
    console.log(categories);
    const onSubmit = async (data) => {
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
                    state: data.state || "", // Optional
                    country: data.country
                }
            };

            const response = await addListing(listingData);
            if (response.success) {
                toast.success('Product added successfully!');
                reset();
                window.location.reload();
            } else {
                throw new Error('Failed to add product');
            }
        } catch (error) {
            console.error("Error submitting product:", error);
            toast.error('Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    const uploadImages = async (files) => {
        const uploadedImages = [];
        if (files && files.length > 0) {
            for (const file of files) {
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
                    console.error("Cloudinary upload error:", data);
                    throw new Error('Failed to upload image to Cloudinary');
                }
            }
        } else {
            throw new Error('At least one image is required');
        }
        return uploadedImages;
    };

    const handleCancel = () => {
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-md rounded-md space-y-4">
            <h2 className="text-xl font-semibold">Add Product</h2>

            <div>
                <Label>Title</Label>
                <Input type="text" {...register("title", { required: "Title is required" })} />
                {errors.title && <span className="text-red-500">{errors.title.message}</span>}
            </div>

            <div>
                <Label>Description</Label>
                <Textarea {...register("description", { required: "Description is required" })} />
                {errors.description && <span className="text-red-500">{errors.description.message}</span>}
            </div>




            <div className="flex justify-between gap-4">
                <div className="w-full">
                    <Label>Price</Label>
                    <Input type="number" {...register("price", { required: "Price is required", min: 1 })} />
                    {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                </div>
                <div className="w-full">
                    <Label>Status</Label>
                    <select {...register("status", { required: "Status is required" })} className="input border w-full rounded-md p-1">
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                    </select>
                    {errors.status && <span className="text-red-500">{errors.status.message}</span>}
                </div>
                <div className="w-full">
                    <Label>Condition</Label>
                    <select {...register("condition", { required: "Condition is required" })} className=" input border w-full rounded-md p-1">
                        <option value="">Select Condition</option>
                        {conditionOptions.map((condition) => (
                            <option key={condition} value={condition}>{condition}</option>
                        ))}
                    </select>
                    {errors.condition && <span className="text-red-500">{errors.condition.message}</span>}
                </div>
            </div>
            <div>
                <Label>Category</Label>
                <select {...register("category", { required: "Category is required" })} className="input border w-full rounded-md p-1">
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
                {errors.category && <span className="text-red-500">{errors.category.message}</span>}
            </div>

            <div className="flex justify-between gap-4">
                <div className="w-full">
                    <Label>City</Label>
                    <select {...register("city", { required: "City is required" })} className="input border w-full rounded-md p-1">
                        <option value="">Select City</option>
                        {districtsOfBangladesh.map((district) => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                    {errors.city && <span className="text-red-500">{errors.city.message}</span>}
                </div>

                <div className="w-full">
                    <Label>State (Optional)</Label>
                    <Input type="text" {...register("state")} />
                </div>

                <div className="w-full">
                    <Label>Country</Label>
                    <Input type="text" {...register("country", { required: "Country is required" })} />
                    {errors.country && <span className="text-red-500">{errors.country.message}</span>}
                </div>

            </div>
            <div>
                <Label>Upload Images</Label>
                <Input type="file" multiple accept="image/*" {...register("images", { required: "At least one image is required" })} />
                {errors.images && <span className="text-red-500">{errors.images.message}</span>}
            </div>

            <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default AddProduct;
