import AddProduct from "@/components/modules/dashboard/Forms/AddProductForm";
import ManageListing from "@/components/modules/dashboard/ListingTable";
import CategoryManagement from "@/components/modules/dashboard/ListingTable/CategoryManagement";

import { Button } from "@/components/ui/button";
import { getAllListings } from "@/services/listings";
import Link from "next/link";

const ListingPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) => {
    const { page } = await searchParams;
    const pageQuery = `page=${page}`;
    const { data: listings } = await getAllListings('10', pageQuery);

    return (
        <div className="container   mx-auto overflow-hidden pt-20">
            <div className="flex px-3 justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Manage Listings({listings?.listings?.length})</h1>
                <Link href={'#addListing'}>
                    <Button className="bg-[#023047] rounded-none">Add Product</Button>
                </Link>
            </div>
            <ManageListing listings={listings} />

            <AddProduct />
            <CategoryManagement />
        </div>
    );
};

export default ListingPage;
