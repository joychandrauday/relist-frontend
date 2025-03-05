'use client'
import { useUser } from '@/context/UserContext';
import { removeFromWishlist } from '@/services/AuthService';
import { getSingleUser } from '@/services/Profile';
import { IProduct } from '@/types/product';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HiCurrencyBangladeshi } from 'react-icons/hi';


const WishListContainer = () => {
    const { user } = useUser();
    const [wishlist, setWishlist] = useState<IProduct[]>([]);

    useEffect(() => {
        if (!user?.id) return; // Prevent API call if user is not available

        const fetchUserData = async () => {
            try {
                const userData = await getSingleUser(user.id);
                console.log("Fetched User Data:", userData);

                // Ensure correct path to wishlist
                if (userData?.data?.wishlist) {
                    setWishlist(userData.data.wishlist); // Fix the path
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [user?.id]);

    const handleRemoveItem = async (itemId: string) => {
        try {
            // Call API to remove item from the wishlist
            const updatedUser = await removeFromWishlist(itemId);
            if (updatedUser?.data?.wishlist) {
                setWishlist(updatedUser.data.wishlist);
            }
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
            <div className="mx-auto container">
                {wishlist.length > 0 ? (
                    <ul className="grid grid-cols-3 gap-4 items-center">
                        {wishlist.map((item) => (
                            <li key={item._id} className="p-4 bg-white shadow rounded flex items-center space-x-4 relative">
                                <Image
                                    src={item.images?.[0] || '/default-image.jpg'}
                                    alt={item.title}
                                    width={64} // Required for Next.js Image
                                    height={64} // Required for Next.js Image
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-gray-500 flex items-center gap-2"><HiCurrencyBangladeshi />{item.price}</p>
                                </div>
                                {/* buy now */}
                                <button className="bg-[#FB8500] text-white px-4 py-2 rounded-none">
                                    <Link href={`/products/${item._id}`}>
                                        Buy now
                                    </Link>
                                </button>


                                {/* Cross Icon to Remove from Wishlist */}
                                < button
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                    onClick={() => handleRemoveItem(item._id)}
                                >
                                    <XIcon className="w-5 h-5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Your wishlist is empty.</p>
                )
                }
            </div >
        </div >
    );
};

export default WishListContainer;
