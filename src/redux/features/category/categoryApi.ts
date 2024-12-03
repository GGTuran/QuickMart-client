import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => ({
                url: `/category`,
                method: 'GET',
            }),
            providesTags: ['category'],
        }),
        getCategoryById: builder.query({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'GET',
            }),
            providesTags: ['category'],
        }),
        addCategory: builder.mutation({
            query: (categoryInfo) => {
                // console.log('from base api=>', bikeInfo);
                return {
                    url: `/category`,
                    method: 'POST',
                    body: categoryInfo,
                }
            },
            invalidatesTags: ['category'],
        }),
        updateCategory: builder.mutation({
            query: ({ id, categoryInfo }) => {
                // console.log('from base api', id,categoryInfo)
                return {
                    url: `/category/${id}`,
                    method: 'PATCH',
                    body: categoryInfo,
                };
            },
            invalidatesTags: ['category'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['category'],
        }),


    })
})

export const { useAddCategoryMutation, useGetAllCategoryQuery, useGetCategoryByIdQuery, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApi;
