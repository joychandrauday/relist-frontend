
import SIngleProductContainer from "@/components/modules/Products/SIngleProductContainer";
import { getSingleProduct } from "@/services/listings";


const SingleProductPage = async ({ params,
}: {
    params: Promise<{ productId: string }>;
}) => {
    const { productId } = await params;
    const { data: product } = await getSingleProduct(productId);

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-semibold text-red-500">Product not found</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 pt-10">
            <SIngleProductContainer product={product} />
        </div >
    );
};

export default SingleProductPage;
