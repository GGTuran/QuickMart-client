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




    })
})

export const { useCreateOrderMutation } = orderApi;
