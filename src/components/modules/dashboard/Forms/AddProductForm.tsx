'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { addListing } from "@/services/listings";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { revalidateProductTag } from "@/lib/revalidateProductTag";

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const imageLinks = await uploadImages(data.images);

            const listingData = {
                title: data.title,
                description: data.description,
                price: data.price,
                condition: data.condition,
                images: imageLinks,
                status: data.status,
            };

            const response = await addListing(listingData);
            if (response.success) {
                toast.success('Product added successfully!');
                reset();
                // revalidateProductTag()
                window.location.reload()
            } else {
                throw new Error('Failed to add product');
            }
        } catch (error) {
            console.error("Error submitting product:", error);
            toast.error('Failed to add product');
        } finally {
            setLoading(false); // সাবমিট শেষে লোডিং বন্ধ
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

            <div>
                <Label>Condition</Label>
                <Input type="text" {...register("condition", { required: "Condition is required" })} />
                {errors.condition && <span className="text-red-500">{errors.condition.message}</span>}
            </div>

            <div>
                <Label>Price</Label>
                <Input type="number" {...register("price", { required: "Price is required" })} />
                {errors.price && <span className="text-red-500">{errors.price.message}</span>}
            </div>

            <div>
                <Label>Status</Label>
                <select {...register("status", { required: "Status is required" })} className="input">
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                </select>
                {errors.status && <span className="text-red-500">{errors.status.message}</span>}
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
