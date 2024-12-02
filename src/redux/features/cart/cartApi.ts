import { baseApi } from "@/redux/api/baseApi";

const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCartDetails: builder.query({
            query: (userId) => ({
                url: `/`,
                method: 'GET',
                params: { userId },
            }),
            providesTags: ["cart"]
        }),
        addToCart: builder.mutation({
            query: ({ userId, productId, quantity }) => ({
                url: `/add`,
                method: 'POST',
                body: { userId, items: { productId, quantity } },
            }),
            invalidatesTags: ["cart"]
        }),
        replaceCart: builder.mutation({
            query: ({ userId, productId, quantity }) => ({
                url: `/replace`,
                method: 'POST',
                body: { userId, items: { productId, quantity } },
            }),
            invalidatesTags: ["cart"]
        }),


    })
})

export const { useGetCartDetailsQuery, useAddToCartMutation, useReplaceCartMutation } = cartApi;
