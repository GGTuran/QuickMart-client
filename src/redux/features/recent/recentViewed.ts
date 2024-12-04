import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "@/types/product.interface";

export interface RecentlyViewedState {
    products: TProduct[];
}

const initialState: RecentlyViewedState = {
    products: [],
};

const recentlyViewedSlice = createSlice({
    name: "recentlyViewed",
    initialState,
    reducers: {
        addToRecentlyViewed: (state, action: PayloadAction<TProduct>) => {
            // Check if the product is already in the recentlyViewed list
            const existingProductIndex = state.products.findIndex(
                (product) => product._id === action.payload._id
            );

            // If the product is found, remove it (to avoid duplication)
            //   if (existingProductIndex !== -1) {
            //     state.products.splice(existingProductIndex, 1);
            //   }

            // Add the new product to the beginning of the array
            state.products = [action.payload, ...state.products];

            // Limit the list to 10 recent products
            state.products = state.products.slice(0, 10);
        },
    },
});

export const { addToRecentlyViewed } = recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;
