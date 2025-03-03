'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteListing, updateListing } from "@/services/listings";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Swal from "sweetalert2"; // SweetAlert2 import
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "@/components/ui/avatar";

// Interfaces
interface Listing {
    _id: string;
    title: string;
    description: string;
    price: number;
    condition: string;
    status: string;
}

// Props
const ListingTable = ({ listings }: { listings: Listing[] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState<Partial<Listing> | null>(null);
    const [originalListing, setOriginalListing] = useState<Partial<Listing> | null>(null);

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

    // Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedListing) return;
        setSelectedListing({
            ...selectedListing,
            [e.target.name]: e.target.value,
        });
    };

    // Save Changes
    const handleSave = async () => {
        if (!selectedListing || !selectedListing._id) return;

        // Extract only modified fields
        const updatedFields: Partial<Listing> = {};
        Object.keys(selectedListing).forEach((key) => {
            if (selectedListing[key as keyof Listing] !== originalListing?.[key as keyof Listing]) {
                updatedFields[key as keyof Listing] = selectedListing[key as keyof Listing];
            }
        });

        if (Object.keys(updatedFields).length === 0) {
            toast.info("No changes made.");
            return;
        }

        try {
            await updateListing(updatedFields, selectedListing._id);
            console.log(updatedFields);
            toast.success("Listing updated successfully!");
            closeModal();
        } catch (error) {
            toast.error("Failed to update listing.");
        }
    };

    // Handle Delete
    const handleDelete = async (id: string) => {
        // Show confirmation dialog
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
                console.log(res);
                // add swal for success not toast
                Swal.fire("Deleted!", "The listing has been deleted.", "success");
                window.location.reload()
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
                                <TableCell>{listing.status}</TableCell>
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
                            <div>
                                <Label htmlFor="condition">Condition</Label>
                                <Input name="condition" value={selectedListing.condition || ""} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select value={selectedListing.status || ""} onValueChange={(value) => handleChange({ target: { name: 'status', value } })}>
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
