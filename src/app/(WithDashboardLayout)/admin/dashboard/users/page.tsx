import Userble from "@/components/modules/dashboard/UserTable/UsersTable";
import { getAllUsers } from "@/services/user";

const ListingPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) => {
    const { page } = await searchParams;
    const pageQuery = `page=${page}`;
    const { data: users } = await getAllUsers('10', pageQuery);

    return (
        <div className="container mx-auto px-6 py-20sm:w-[100vw] md:w-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Manage Users({users?.meta.total})</h1>

            </div>

            <Userble users={users.users} totalPages={users.meta.totalPages} />

        </div>
    );
};

export default ListingPage;
