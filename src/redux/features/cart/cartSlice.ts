import { TProduct } from "@/types/product.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type CartItem = {
    productId: string;
    quantity: number;
    product: TProduct;
    shopId: string;
};

type CartState = {
    items: CartItem[];
    currentShopId: string | null;
    cartConflict: boolean;
    userId: string | null;
};

const initialState: CartState = {
    items: [],
    currentShopId: null,
    cartConflict: false,
    userId: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<{
                product: TProduct;
                shopId: { _id: string; };
                userId: string;
            }>
        ) => {
            const { product, shopId, userId } = action.payload;

            // Extract the unique shop identifier (_id or vendorId)
            const shopIdentifier = shopId._id;


            // console.log("Current Shop ID:", state.currentShopId);
            // console.log("Incoming Shop ID:", shopIdentifier);

            // Checking for shop conflict
            if (state.currentShopId && state.currentShopId !== shopIdentifier) {
                state.cartConflict = true;
                return;
            }

            // Checking if the product already exists in the cart
            const existingProduct = state.items.find(
                (item) => item.productId === product._id
            );

            if (existingProduct) {
                // Update quantity if within inventory limits
                if (existingProduct.quantity < product.inventoryCount) {
                    existingProduct.quantity++;
                }
            } else {
                // Add new product to the cart
                state.items.push({
                    productId: product._id as string,
                    quantity: 1,
                    product,
                    shopId: shopIdentifier,
                });

                // Set current shop ID and user ID
                state.currentShopId = shopIdentifier;
                state.userId = userId;
            }

            // Reset conflict flag
            state.cartConflict = false;
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.productId !== action.payload
            );

            // If cart becomes empty, reset vendor and user
            if (state.items.length === 0) {
                state.currentShopId = null;
                state.userId = null;
            }
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ productId: string; quantity: number }>
        ) => {
            const { productId, quantity } = action.payload;
            const existingProduct = state.items.find(
                (item) => item.productId === productId
            );

            if (
                existingProduct &&
                quantity > 0 &&
                quantity <= existingProduct.product.inventoryCount
            ) {
                existingProduct.quantity = quantity;
            }
        },
        resolveConflict: (
            state,
            action: PayloadAction<{ replace: boolean }>
        ) => {
            if (action.payload.replace) {
                // Replace cart with the new product
                state.items = [];
                state.cartConflict = false;
            } else {
                // Retain the current cart and cancel the conflict
                state.cartConflict = false;
            }
        },

        replaceCart: (
            state,
            action: PayloadAction<{
                product: TProduct;
                shopId: string;
                userId: string;
            }>
        ) => {
            const { product, shopId, userId } = action.payload;

            state.items = [
                { productId: product._id as string, quantity: 1, product, shopId },
            ];
            state.currentShopId = shopId;
            state.cartConflict = false;
            state.userId = userId;
        },
        cancelCartUpdate: (state) => {
            state.cartConflict = false;
        },
        resetCart: (state) => {
            state.items = [];
            state.currentShopId = null;
            state.cartConflict = false;
            state.userId = null;
        },
        clearOrderedItems: (state) => {
            state.items = [];
            state.currentShopId = null;
            state.userId = null;
        },

    },
});

export const {
    addToCart,
    resolveConflict,
    removeFromCart,
    updateQuantity,
    replaceCart,
    cancelCartUpdate,
    resetCart,
    clearOrderedItems,
} = cartSlice.actions;
export default cartSlice.reducer;
