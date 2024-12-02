import { baseApi } from "@/redux/api/baseApi";

const shopApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllShops: builder.query({
            query: () => ({
                url: `/shop`,
                method: 'GET',

            }),
            providesTags: ['shops'],
        }),
        getShopById: builder.query({
            query: (id) => ({
                url: `/shop/${id}`,
                method: 'GET',
            }),
            providesTags: ['shops'],
        }),
        followShop: builder.mutation({
            query: (shopId) => ({
                url: `/shop/follow`,
                method: "POST",
                body: { shopId },
            }),
            invalidatesTags: ["shops"],
        }),
        unfollowShop: builder.mutation({
            query: (shopId) => ({
                url: `/shop/unfollow`,
                method: "POST",
                body: { shopId },
            }),
            invalidatesTags: ["shops", "users"],
        }),



    })
})

export const { useGetAllShopsQuery, useGetShopByIdQuery, useFollowShopMutation, useUnfollowShopMutation } = shopApi;
