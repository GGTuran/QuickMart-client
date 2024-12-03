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

        addShop: builder.mutation({
            query: (shopInfo) => {

                return {
                    url: `/shop`,
                    method: 'POST',
                    body: shopInfo,
                }
            },
            invalidatesTags: ['shops'],
        }),
        updateShop: builder.mutation({
            query: ({ id, shopInfo }) => {
                // console.log('from base api', id,shopInfo)
                return {
                    url: `/shop/${id}`,
                    method: 'PATCH',
                    body: shopInfo,
                };
            },
            invalidatesTags: ['shops'],
        }),
        deleteShop: builder.mutation({
            query: (id) => ({
                url: `/shop/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['shops'],
        }),

    })
})

export const { useAddShopMutation, useGetAllShopsQuery, useGetShopByIdQuery, useFollowShopMutation, useUnfollowShopMutation, useUpdateShopMutation, useDeleteShopMutation } = shopApi;
