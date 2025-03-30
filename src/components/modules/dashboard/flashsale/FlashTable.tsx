/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteListing, getAllCategories, updateListing } from "@/services/listings";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Swal from "sweetalert2"; // SweetAlert2 import
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "@/components/ui/avatar";
import { ICategory } from "../../Products/ProductFilter";
import Image from "next/image";
import { IProduct } from "@/types/product";

const conditionOptions = [
    "Brand New", "Like New", "Excellent", "Very Good", "Good", "Fair", "Refurbished", "For Parts / Not Working"
];
const districtsOfBangladesh = [
    "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];
// Props
const FlashSale = ({ listings }: { listings: IProduct[] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState<Partial<IProduct> | null>(null);
    const [originalListing, setOriginalListing] = useState<Partial<IProduct> | null>(null);
    const [categories, setCategories] = useState<ICategory[]>([])
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
    // Open Modal with Selected Listing Data
    const openEditModal = (listing: IProduct) => {
        setSelectedListing({ ...listing });
        setOriginalListing({ ...listing }); // Store original data to compare changes
        setIsModalOpen(true);
    };

    // Close Modal
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

    // Handle location field changes
    const handleLocationChange = (
        e: React.ChangeEvent<HTMLElement>,
        field: 'city' | 'state' | 'country'
    ) => {
        if (!selectedListing) return;
        if (e.target instanceof HTMLSelectElement) {
            setSelectedListing({
                ...selectedListing,
                location: {
                    ...selectedListing.location,
                    [field]: e.target.value || "",
                } as { city: string; state?: string; country: string },

            });
        }
    }

    // Save changes
    const handleSave = async () => {
        if (!selectedListing || !selectedListing._id) return;

        // Extract only modified fields
        const updatedFields: Partial<IProduct> = {};

        // Iterate over selectedListing keys
        (Object.keys(selectedListing) as (keyof IProduct)[]).forEach((key) => {
            const newValue = selectedListing[key];
            const oldValue = originalListing?.[key];

            if (key === 'location' && typeof newValue === 'object' && newValue !== null) {
                // Handle nested properties inside 'location'
                const location = newValue as { city?: string; state?: string; country: string };
                const originalLocation = oldValue as { city?: string; state?: string; country: string } | undefined;

                // Check if location has changed by comparing serialized versions
                if (JSON.stringify(location) !== JSON.stringify(originalLocation)) {
                    updatedFields[key] = {
                        city: location.city !== undefined ? location.city : "", // Ensure city is set to an empty string if not defined
                        state: location.state,
                        country: location.country,
                    };
                }
            } else if (newValue !== oldValue) {
                updatedFields[key] = newValue as never; // Ensuring type consistency
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
            toast.error("Failed to update listing.");
        }
    };




    // Handle Delete
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
                const res = await deleteListing(id);

                Swal.fire("Deleted!", "The listing has been deleted.", "success");
                // window.location.reload();
            } catch (error) {
                toast.error("Failed to delete listing.");
            }
        }
    };

    return (
        <div className="wrap overflow-x-auto">
            <div className="overflow-x-auto table-auto w-full">
                <table className="w-full min-w-[600px] border border-gray-300">
                    <thead className="">
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
                                        {listing?.status}
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
                    <div className="backdrop-blur-lg border-2 border-gray-400  rounded-lg shadow-lg p-6 w-[500px]">
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
                            <div className="flex gap-2">

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
                            </div>
                            <div>
                                <Label htmlFor="location-state">State</Label>
                                <Input name="state" value={selectedListing.location?.state || ""} onChange={(e) => handleLocationChange(e, 'state')} />
                            </div>
                            <div>
                                <Label htmlFor="location-country">Country</Label>
                                <Input name="country" value={selectedListing.location?.country || ""} onChange={(e) => handleLocationChange(e, 'country')} />
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <select
                                    name="status"
                                    value={selectedListing?.status || ""}
                                    onChange={(e) => setSelectedListing({
                                        ...selectedListing,
                                        status: e.target.value as "sold" | "available"
                                    })}
                                    className="input"
                                >
                                    <option value="">Select Status</option>
                                    <option value="sold">Sold</option>
                                    <option value="available">Available</option>
                                </select>
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

export default FlashSale;
