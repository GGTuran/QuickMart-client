import { baseApi } from "@/redux/api/baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllReview: builder.query({
            query: () => ({
                url: `/review`,
                method: 'GET',
            }),
            providesTags: ['review'],
        }),
        getReviewById: builder.query({
            query: (id) => ({
                url: `/review/${id}`,
                method: 'GET',
            }),
            providesTags: ['review'],
        }),
        addReview: builder.mutation({
            query: (reviewInfo) => {

                return {
                    url: `/review`,
                    method: 'POST',
                    body: reviewInfo,
                }
            },
            invalidatesTags: ['products'],
        }),
        updateReview: builder.mutation({
            query: ({ id, reviewInfo }) => {
                // console.log('from base api', id,reviewInfo)
                return {
                    url: `/review/${id}`,
                    method: 'PATCH',
                    body: reviewInfo,
                };
            },
            invalidatesTags: ['review'],
        }),
        deleteReview: builder.mutation({
            query: (id) => ({
                url: `/review/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['review'],
        }),
        getReviewByProductId: builder.query({
            query: (productId) => ({
                url: `/review/product/${productId}`,
                // /product/:productId
                method: 'GET',
            }),
            providesTags: ['review'],
        }),


    })
})

export const { useAddReviewMutation, useGetAllReviewQuery, useGetReviewByIdQuery, useUpdateReviewMutation, useDeleteReviewMutation, useGetReviewByProductIdQuery } = reviewApi;
