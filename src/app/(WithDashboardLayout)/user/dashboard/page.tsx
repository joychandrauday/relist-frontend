import UserOverview from "@/components/modules/dashboard/AdminOverview/UserOverview";
import { getAllListingsByUser } from "@/services/listings";
import { getOrdersByUserId, getSalesByUserId } from "@/services/sales-purchase";

export default async function UserDashboard() {
  const { data: listings } = await getAllListingsByUser();
  const { data: orders } = await getOrdersByUserId();
  const { data: sales } = await getSalesByUserId();
  return (
    <div className="p-4">
      <UserOverview listingMeta={listings} purchaseMeta={orders} salesMeta={sales} />
    </div>
  );
}
