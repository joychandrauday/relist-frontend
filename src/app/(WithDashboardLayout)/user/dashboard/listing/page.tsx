import AddProduct from "@/components/modules/dashboard/Forms/AddProductForm";
import ManageListing from "@/components/modules/dashboard/ListingTable";
import ListingTable from "@/components/modules/dashboard/ListingTable/ListingTable";
import { Button } from "@/components/ui/button";
import { getAllListingsByUser } from "@/services/listings";
import Link from "next/link";

const ListingPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) => {
    const { page } = await searchParams;
    const { data: listings } = await getAllListingsByUser(page, '1');
    console.log(listings);
    return (
        <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Manage Listings({listings?.listings?.length})</h1>
                <Link href={'#addListing'}>
                    <Button className="bg-[#023047] rounded-none">Add Product</Button>
                </Link>
            </div>
            <ManageListing listings={listings} />

            <AddProduct />
        </div>
    );
};

export default ListingPage;
