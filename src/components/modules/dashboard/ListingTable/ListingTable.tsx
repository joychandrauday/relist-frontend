'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteListing, updateListing } from "@/services/listings";
import { toast } from "sonner";
import Swal from "sweetalert2"; // SweetAlert2 import
import Image from "next/image";

// Interfaces
interface Listing {
    _id: string;
    title: string;
    description: string;
    price: number;
    condition: string;
    category: {
        _id: string;
        name: string;
    };
    status: string;
    images: string[];
    location: {
        city: string;
        state?: string;
        country: string;
    };
    quantity: number;
}

const conditionOptions = [
    "Brand New", "Like New", "Excellent", "Very Good", "Good", "Fair", "Refurbished", "For Parts / Not Working"
];
const districtsOfBangladesh = [
    "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];

// Props
const ListingTable = ({ listings }: { listings: Listing[] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState<Partial<Listing> | null>(null);
    const [originalListing, setOriginalListing] = useState<Partial<Listing> | null>(null);

    const openEditModal = (listing: Listing) => {
        setSelectedListing({ ...listing });
        setOriginalListing({ ...listing });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedListing(null);
        setOriginalListing(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedListing) return;
        setSelectedListing({
            ...selectedListing,
            [e.target.name]: e.target.value,
        });
    };

    const handleLocationChange = (
        e: React.ChangeEvent<HTMLElement>,
        field: 'city' | 'state' | 'country'
    ) => {
        if (!selectedListing) return;

        // Ensure selectedListing.location exists or fallback to an empty object
        const location = selectedListing.location ?? { city: "", state: "", country: "" };

        const target = e.target as HTMLSelectElement | HTMLInputElement;
        const value = target.value;

        // Ensure city and country are always strings, provide empty string if undefined
        const newLocation = {
            ...location,
            [field]: value,
            city: location.city ?? "", // Ensure city is always a string
            country: location.country ?? "" // Ensure country is always a string
        };

        setSelectedListing({
            ...selectedListing,
            location: newLocation,
        });
    };



    const handleSave = async () => {
        if (!selectedListing || !selectedListing._id) return;

        const updatedFields: Partial<Listing> = {};

        (Object.keys(selectedListing) as (keyof Listing)[]).forEach((key) => {
            const newValue = selectedListing[key];
            const oldValue = originalListing?.[key];

            if (key === 'location' && typeof newValue === 'object' && newValue !== null) {
                const location = newValue as { city?: string; state?: string; country: string };
                const originalLocation = oldValue as { city?: string; state?: string; country: string } | undefined;

                // Ensure city is always a string, even if it's undefined
                const sanitizedLocation = {
                    city: location.city ?? "", // Fallback to an empty string if city is undefined
                    state: location.state,
                    country: location.country ?? "", // Fallback to an empty string if country is undefined
                };

                // Compare with originalLocation to check if any change occurred
                if (JSON.stringify(sanitizedLocation) !== JSON.stringify(originalLocation)) {
                    updatedFields[key] = sanitizedLocation;
                }
            } else if (newValue !== oldValue) {
                updatedFields[key] = newValue as never;
            }
        });

        if (Object.keys(updatedFields).length === 0) {
            toast.info("No changes made.");
            return;
        }

        try {
            await updateListing(updatedFields, selectedListing._id);
            toast.success("Listing updated successfully!");
            closeModal();
        } catch (error) {
            console.log(error);
            toast.error("Failed to update listing.");
        }
    };

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this listing?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                await deleteListing(id);
                Swal.fire("Deleted!", "The listing has been deleted.", "success");
            } catch (error) {
                console.log(error);
                toast.error("Failed to delete listing.");
            }
        }
    };

    return (
        <div className="wrap overflow-x-auto">
            <div className="overflow-x-auto table-auto w-full">
                <table className="w-full min-w-[600px] border border-gray-300">
                    <thead>
                        <tr>
                            <th className="p-2 text-sm md:text-base border">Title</th>
                            <th className="p-2 text-sm md:text-base border">Price</th>
                            <th className="p-2 text-sm md:text-base border">Status</th>
                            <th className="p-2 text-sm md:text-base border">Image</th>
                            <th className="p-2 text-sm md:text-base border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listings?.length > 0 ? (
                            listings?.map((listing) => (
                                <tr key={listing._id} className="text-xs md:text-sm border">
                                    <td className="p-2 border">{listing.title.slice(0, 30)}...</td>
                                    <td className="p-2 border">৳{listing.price}</td>
                                    <td className="p-2 border">
                                        <select
                                            value={listing.status}
                                            onChange={async (e) => {
                                                try {
                                                    await updateListing({ status: e.target.value }, listing._id);
                                                    toast.success("Status updated successfully!");
                                                } catch (error) {
                                                    console.log(error);
                                                    toast.error("Failed to update status.");
                                                }
                                            }}
                                            className="w-[80px] text-xs md:text-sm border rounded p-1"
                                        >
                                            <option value="sold">Sold</option>
                                            <option value="available">Available</option>
                                        </select>
                                    </td>
                                    <td className="p-2 border">
                                        <Image
                                            src={listing.images[0]}
                                            alt={listing.title}
                                            className="rounded-full w-10 h-10 md:w-12 md:h-12"
                                            width={120}
                                            height={120}
                                        />
                                    </td>
                                    <td className="p-2 border">
                                        <div className="flex flex-col md:flex-row gap-2">
                                            <button className="border px-2 py-1 rounded text-xs md:text-sm" onClick={() => openEditModal(listing)}>Edit</button>
                                            <button className="border px-2 py-1 rounded text-xs md:text-sm bg-red-500 text-white" onClick={() => handleDelete(listing._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-xs md:text-sm border">
                                    No listings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isModalOpen && selectedListing && (
                <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${isModalOpen ? '' : 'hidden'}`}>
                    <div className="backdrop-blur-lg border-2 border-gray-400 rounded-lg shadow-lg p-6 w-[500px]">
                        <h2 className="text-lg font-semibold mb-4">Edit Listing</h2>
                        <div className="grid gap-2 py-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input name="title" value={selectedListing.title || ""} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Input name="description" value={selectedListing.description || ""} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="price">Price</Label>
                                <Input name="price" type="number" value={selectedListing.price || ""} onChange={handleChange} />
                            </div>
                            <div className="grid grid-cols-2 gap-2">

                                <div>
                                    <Label htmlFor="condition">Condition</Label>
                                    <select name="condition" value={selectedListing?.condition || ""} onChange={(e) => setSelectedListing({ ...selectedListing, condition: e.target.value })} className="input">
                                        <option value="">Select Condition</option>
                                        {conditionOptions.map((condition) => (
                                            <option key={condition} value={condition}>{condition}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="location-city">City</Label>
                                    <select name="city" value={selectedListing?.location?.city || ""} onChange={(e) => handleLocationChange(e, 'city')} className="input">
                                        <option value="">Select City</option>
                                        {districtsOfBangladesh.map((district) => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <select name="status" value={selectedListing?.status || ""} onChange={(e) => setSelectedListing({ ...selectedListing, status: e.target.value })} className="input">
                                        <option value="">Select Status</option>
                                        <option value="sold">Sold</option>
                                        <option value="available">Available</option>
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="status">Quantity</Label>
                                    <div>
                                        <Label htmlFor="quantity">quantity</Label>
                                        <Input name="quantity" type="number" value={selectedListing.quantity || 0} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button className="px-4 py-2 border rounded" onClick={closeModal}>Cancel</button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListingTable;
