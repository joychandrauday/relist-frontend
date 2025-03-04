/* eslint-disable prefer-const */
"use client";
import { useState } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

export default function Profile() {
    const { user, setUser } = useUser(); // Ensure setUser exists in context
    const [showModal, setShowModal] = useState(false);
    const [updatedName, setUpdatedName] = useState(user?.name || "");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    // Function to upload image to Cloudinary
    const uploadImage = async (file: File) => {
        if (!file) throw new Error("Please select an image to upload.");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "product_images");
        formData.append("cloud_name", "dklikxmpm");

        const res = await fetch("https://api.cloudinary.com/v1_1/dklikxmpm/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
            console.error("Cloudinary upload error:", data);
            throw new Error("Failed to upload image to Cloudinary");
        }
        return data.secure_url;
    };

    // Handle update (either name or image)
    const handleUpdate = async () => {
        if (!user?.id) {
            alert("User ID is missing!");
            return;
        }

        try {
            setUploading(true);
            let avatarUrl = user?.avatar; // Default to existing avatar
            let payload: Partial<{ name: string; avatar: string }> = {};

            // If name is changed, add to payload
            if (updatedName && updatedName !== user.name) {
                payload.name = updatedName;
            }

            // If a new image is selected, upload it first
            if (selectedFile) {
                avatarUrl = await uploadImage(selectedFile);
                payload.avatar = avatarUrl;
            }

            // Prevent sending request if no changes
            if (Object.keys(payload).length === 0) {
                alert("No changes detected!");
                return;
            }

            // Send update request
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to update user.");
            const updatedUser = await res.json();

            // Update user state
            setUser({
                ...user,
                ...updatedUser.data, // Merge updated data
            });
            toast.success("Profile updated successfully!");
        } catch (error: any) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            {/* Profile Picture */}
            <div className="relative w-32 h-32 mx-auto cursor-pointer" onClick={() => setShowModal(true)}>
                <Image
                    src={user?.avatar ? user.avatar : "/default-avatar.png"}
                    alt="User Avatar"
                    width={128}
                    height={128}
                    className="rounded-full border-2 border-gray-300"
                />
            </div>

            {/* User Info */}
            <h2 className="text-xl font-semibold text-center mt-4">{user?.name || "Unknown User"}</h2>
            <p className="text-gray-500 text-center">{user?.email || "No email available"}</p>

            {/* Update Name */}
            <div className="mt-4">
                <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="w-full border rounded p-2"
                    placeholder="Update Name"
                />
            </div>

            {/* Upload Image */}
            <div className="mt-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="w-full border rounded p-2"
                />
            </div>

            {/* Update Button */}
            <button
                onClick={handleUpdate}
                className="mt-2 bg-blue-500 text-white py-1 px-3 rounded disabled:bg-gray-400"
                disabled={uploading}
            >
                {uploading ? "Updating..." : "Update"}
            </button>

            {/* Image Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg">
                        <Image
                            src={user?.avatar ? user.avatar : "/default-avatar.png"}
                            alt="Profile Image"
                            width={300}
                            height={300}
                            className="rounded-lg"
                        />
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-2 bg-red-500 text-white py-1 px-3 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
