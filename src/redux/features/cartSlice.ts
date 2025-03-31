import { IProduct } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { WritableDraft } from "immer";

interface CartProduct extends IProduct {
    orderQuantity: number
}

interface InitialState {
    products: CartProduct[];
}
const initialState: InitialState = {
    products: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const productToAdd = state.products.find((product) =>
                product._id === action.payload._id
            )

            if (productToAdd) {
                productToAdd.orderQuantity += 1
                return;
            }

            state.products.push({ ...action.payload, orderQuantity: 1 })
        },
        incrementOrderQuantity: (state, action) => {
            const productToIncrement = state.products.find((product) =>
                product._id === action.payload
            )
            if (productToIncrement) {
                productToIncrement.orderQuantity += 1
                return;
            }
        },
        decrementOrderQuantity: (state, action) => {
            const productToDecrement = state.products.find((product) =>
                product._id === action.payload
            )
            if (productToDecrement) {
                productToDecrement.orderQuantity -= 1
                return;
            }
        },
        removeItem: (state, action) => {
            state.products = state.products.filter(
                (product) => product._id != action.payload
            )
        },
        updateCartProduct: (state, action) => {
            const updatedProduct = action.payload;
            const productIndex = state.products.findIndex((p) => p._id === updatedProduct._id);

            if (productIndex !== -1) {
                state.products[productIndex] = {
                    ...updatedProduct,
                    orderQuantity: state.products[productIndex].orderQuantity
                };
            }
        },

        syncCartWithServer: (state, action) => {
            const latestProducts = action.payload;
            latestProducts.forEach((latestProduct: WritableDraft<CartProduct>) => {
                const productIndex = state.products.findIndex((p) => p._id === latestProduct._id);
                if (productIndex !== -1) {
                    state.products[productIndex] = {
                        ...latestProduct,
                        orderQuantity: state.products[productIndex].orderQuantity
                    };
                }
            });
        }
    }
})
export const orderedProducts = (state: RootState) => {
    return state.cart.products
}


export const { addProduct, incrementOrderQuantity, decrementOrderQuantity, removeItem, syncCartWithServer } = cartSlice.actions
export default cartSlice.reducer