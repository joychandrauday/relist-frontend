import AdminOverview from "@/components/modules/dashboard/AdminOverview/AdminOverview";
import { getAllListings } from "@/services/listings";
import { getOrders } from "@/services/sales-purchase";
import { getAllUsers } from "@/services/user";

const AdminHomePage = async () => {
  const { data: listings } = await getAllListings();
  const { data: users } = await getAllUsers();
  const { data: orders } = await getOrders();
  return (
    <div className="p-4">
      <AdminOverview listings={listings} users={users} orders={orders} />
    </div>
  );
};

export default AdminHomePage;
