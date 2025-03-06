"use client";
import { IProduct } from "@/types/product";
import ProductCard from "./ProductCard";
import ProductFilter from "./ProductFilter";
import ProductPaginate from "./ProductPaginate";

interface Meta {
    totalPages: number;
}

interface Prop {
    data: {
        listings: IProduct[];
        meta: Meta;
    };
}
const ProductContainer = ({ data }: { data: Prop['data'] }) => {
    return (
        <div className="wrap">
            <ProductFilter />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 container mx-auto">
                {data?.listings.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            <ProductPaginate totalPage={data.meta.totalPages} />
        </div >
    );
};

export default ProductContainer;
