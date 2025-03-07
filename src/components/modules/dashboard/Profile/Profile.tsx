"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { getSingleUserProfile, updateUser } from "@/services/Profile";

interface UserProfile {
    id: string;
    name: string;
    avatar: string;
    email: string;
}

interface UpdatePayload {
    name?: string;
    avatar?: string;
}

export default function Profile() {
    const { data: session } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [updatedName, setUpdatedName] = useState(session?.user?.name || "");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const [userdb, setUserdb] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (!session?.user?.id) return;

        async function fetchUser() {
            try {
                if (!session?.user?.id) return;
                const res = await getSingleUserProfile(session?.user?.id);
                setUserdb(res.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        fetchUser();
    }, [session?.user?.id]);

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
        if (!session?.user?.id) {
            alert("User ID is missing!");
            return;
        }

        try {
            setUploading(true);
            let avatarUrl = userdb?.avatar
            const payload: UpdatePayload = {};

            // If name is changed, add to payload
            if (updatedName && updatedName !== session?.user.name) {
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
            await updateUser(payload, session?.user.id);
            window.location.reload();
            toast.success("Profile updated successfully!");

        } catch (err) {
            if (err instanceof Error) {
                toast.error(`Failed to verify order. ${err.message}`);
            } else {
                toast.error("Failed to verify order. An unknown error occurred.");
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto backdrop-blur-lg border-2 border-gray-300 shadow-md rounded-lg p-6 my-24">
            {/* Profile Picture */}
            <div className="relative w-32 h-32 mx-auto cursor-pointer" onClick={() => setShowModal(true)}>
                <Image
                    src={userdb?.avatar || "/relisticon.png"}
                    alt="User Avatar"
                    width={128}
                    height={128}
                    className="rounded-full border-2 border-gray-300"
                />
            </div>

            {/* User Info */}
            <h2 className="text-xl font-semibold text-center mt-4">{userdb?.name || session?.user?.name || "Unknown User"}</h2>
            <p className="text-gray-500 text-center">{session?.user?.email || "No email available"}</p>

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
                    <div className=" p-4 rounded-lg">
                        <Image
                            src={userdb?.avatar || "/relisticon.png"}
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
