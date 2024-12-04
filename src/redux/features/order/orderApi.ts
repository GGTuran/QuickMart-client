import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: `/order`,
                method: "POST",
                body: orderData,
            }),
            invalidatesTags: ["order"], // Adjust tags if needed
        }),
        getOrdersByUserId: builder.query({
            query: (userId) => ({
                url: `/order/user/${userId}`,
                method: 'GET',
            }),
            providesTags: ['order'],
        }),
        getOrdersByShopId: builder.query({
            query: (shopId) => ({
                url: `/shop/${shopId}`,
                method: 'GET',
            }),
            providesTags: ['order'],
        }),



    })
})

export const { useCreateOrderMutation, useGetOrdersByUserIdQuery, useGetOrdersByShopIdQuery } = orderApi;
