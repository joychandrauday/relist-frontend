'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateListing } from "@/services/listings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TablePagination from "../ListingTable/TablePagination";
import { addFlashsale, deleteFlashsale } from "@/services/flashSale";
import { ShinyButton } from "@/components/magicui/shiny-button";
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
    offerPrice: number;
    quantity: number;

}

const AddFlashSale = ({ listings }: {
    listings: {

        listings: Listing[],
        meta: {
            totalPages: number
        }
    }
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState<Partial<Listing> | null>(null);
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]); // Track selected product IDs
    const [discountPercentage, setDiscountPercentage] = useState<number>(0); // Track discount percentage

    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedListing(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedListing) return;
        setSelectedListing({
            ...selectedListing,
            [e.target.name]: e.target.value,
        });
    };

    // Handle checkbox change
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
        if (e.target.checked) {
            setSelectedProductIds((prev) => [...prev, productId]);
        } else {
            setSelectedProductIds((prev) => prev.filter(id => id !== productId));
        }
    };

    // Handle Save changes
    const handleSave = async () => {
        if (!selectedListing || !selectedListing._id) return;

        try {
            await updateListing(selectedListing, selectedListing._id);
            toast.success("Listing updated successfully!");
            closeModal();
        } catch (error) {
            console.log(error);
            toast.error("Failed to update listing.");
        }
    };

    // Send selected products and discount to backend
    const handleApplyDiscount = async () => {
        if (selectedProductIds.length === 0) {
            toast.error("Please select at least one product.");
            return;
        }

        const data = {
            products: selectedProductIds,
            discountPercentage: discountPercentage,
        };

        try {
            // Call backend API to apply discount (replace with your backend endpoint)
            const response = await addFlashsale(data)

            if (response.success) {
                toast.success("Discount applied successfully!");
            } else {
                toast.error("Failed to apply discount.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error applying discount.");
        }
    };
    // handleRemoveDis
    const handleRemoveDis = async (id: string) => {
        try {
            // Call backend API to remove discount (replace with your backend endpoint)
            const response = await deleteFlashsale(id)
            if (response.success) {
                toast.success("Discount removed successfully!");
                setDiscountPercentage(0);
                setSelectedProductIds([]);
            } else {
                toast.error("Failed to remove discount.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error removing discount.");
        }
    };

    return (
        <div className="wrap overflow-x-auto">
            <div className="overflow-x-auto table-auto w-full">
                <table className="w-full min-w-[600px] border border-gray-300">
                    <thead>
                        <tr>
                            <th className="p-2 text-sm md:text-base border">Select</th>
                            <th className="p-2 text-sm md:text-base border">Title</th>
                            <th className="p-2 text-sm md:text-base border">Price</th>
                            <th className="p-2 text-sm md:text-base border">OfferPrice</th>
                            <th className="p-2 text-sm md:text-base border">Status</th>
                            <th className="p-2 text-sm md:text-base border">Quantity</th>
                            <th className="p-2 text-sm md:text-base border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listings?.listings.length > 0 ? (
                            listings?.listings.map((listing) => (
                                <tr key={listing._id} className="text-xs md:text-sm border">
                                    <td className="p-2 border">
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleCheckboxChange(e, listing._id)}
                                            checked={selectedProductIds.includes(listing._id)}
                                        />
                                    </td>
                                    <td className="p-2 border">{listing.title.slice(0, 30)}...</td>
                                    <td className="p-2 border">৳{listing.price}</td>
                                    <td className="p-2 border">৳{listing.offerPrice}</td>
                                    <td className="p-2 border">
                                        {listing.status}
                                    </td>
                                    <td className="p-2 border">
                                        {listing.quantity}
                                    </td>
                                    <td className="p-2 border">
                                        {
                                            listing.offerPrice ?
                                                <button className="bg-red-600" onClick={() => handleRemoveDis(listing._id)}>Remove discount</button >
                                                : ''
                                        }
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-xs md:text-sm border">
                                    No listings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <TablePagination totalPage={listings.meta.totalPages} />
            </div>

            {/* Discount Section */}
            <div className="flex justify-between mt-4">
                <div>
                    <Label htmlFor="discount">Discount Percentage</Label>
                    <Input
                        type="number"
                        id="discount"
                        value={discountPercentage}
                        onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                        placeholder="Enter discount percentage"
                    />
                </div>
                <Button onClick={handleApplyDiscount} className="bg-green-500">Apply Discount</Button>
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
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <ShinyButton>
                                    {selectedListing?.status}
                                </ShinyButton>
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

export default AddFlashSale;
