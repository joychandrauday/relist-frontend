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

// Interfaces
interface Listing {
    _id: string;
    title: string;
    description: string;
    price: number;
    condition: string;
    category: string;
    status: string;
    images: string[];
    location: {
        city: string | undefined;
        state?: string;
        country: string;
    };

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
    const openEditModal = (listing: Listing) => {
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

    // Handle Input Change for listing fields
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
        const updatedFields: Partial<Listing> = {};

        // Iterate over selectedListing keys
        (Object.keys(selectedListing) as (keyof Listing)[]).forEach((key) => {
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
            const res = await updateListing(updatedFields, selectedListing._id);
            console.log(res);
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
                await deleteListing(id);
                Swal.fire("Deleted!", "The listing has been deleted.", "success");
                window.location.reload();
            } catch (error) {
                toast.error("Failed to delete listing.");
            }
        }
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {listings?.length > 0 ? (
                        listings?.map((listing) => (
                            <TableRow key={listing._id}>
                                <TableCell>{listing.title}</TableCell>
                                <TableCell>৳{listing.price}</TableCell>
                                <TableCell>
                                    <Select
                                        value={listing.status}
                                        onValueChange={async (newStatus) => {
                                            try {
                                                await updateListing({ status: newStatus }, listing._id);
                                                toast.success("Status updated successfully!");
                                                window.location.reload()
                                            } catch (error) {
                                                toast.error("Failed to update status.");
                                            }
                                        }}
                                    >
                                        <SelectTrigger className="w-[80px]">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sold">Sold</SelectItem>
                                            <SelectItem value="available">Available</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={listing.images[0]} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outline" className="mr-2" onClick={() => openEditModal(listing)}>Edit</Button>
                                    <Button variant="destructive" onClick={() => handleDelete(listing._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-4">
                                No listings found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Edit Modal */}
            {isModalOpen && selectedListing && (
                <Dialog open={isModalOpen} onOpenChange={closeModal}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Listing</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
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

                                {/* category dropdown */}
                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <select
                                        name="category"
                                        value={selectedListing?.category || ""}
                                        onChange={(e) => setSelectedListing({ ...selectedListing, category: e.target.value })}
                                        className="input"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category._id} value={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <Label htmlFor="condition">Condition</Label>
                                    <select
                                        name="condition"
                                        value={selectedListing?.condition || ""}
                                        onChange={(e) => setSelectedListing({ ...selectedListing, condition: e.target.value })}
                                        className="input"
                                    >
                                        <option value="">Select Condition</option>
                                        {conditionOptions.map((condition) => (
                                            <option key={condition} value={condition}>{condition}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="location-city">City</Label>
                                    <select
                                        name="city"
                                        value={selectedListing?.location?.city || ""}
                                        onChange={(e) => handleLocationChange(e, 'city')}
                                        className="input"
                                    >
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
                                <Select
                                    value={selectedListing?.status || ""}
                                    onValueChange={(value) =>
                                        setSelectedListing((prev) => ({
                                            ...prev!,
                                            status: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sold">Sold</SelectItem>
                                        <SelectItem value="available">Available</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={closeModal}>Cancel</Button>
                            <Button onClick={handleSave}>Save</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default ListingTable;
