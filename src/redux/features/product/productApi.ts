import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: ({ searchTerm = '', category = '' }) => ({
                url: `/product`,
                method: 'GET',
                params: { searchTerm, category },
            }),
            providesTags: ['products'],
        }),
        getFlashProducts: builder.query({
            query: () => ({
                url: `/product/low/price`,
                method: 'GET',

            }),
            providesTags: ['products'],
        }),
        getProductById: builder.query({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'GET',
            }),
            providesTags: ['products'],
        }),
        getProductsByShopId: builder.query({
            query: (shopId) => ({
                url: `/product/shop/${shopId}`,
                method: 'GET',
            }),
            providesTags: ['products'],
        }),
        addProduct: builder.mutation({
            query: (productInfo) => {
                // console.log('from base api=>', bikeInfo);
                return {
                    url: `/product`,
                    method: 'POST',
                    body: productInfo,
                }
            },
            invalidatesTags: ['products'],
        }),
        updateProduct: builder.mutation({
            query: ({ id, productInfo }) => {
                // console.log('from base api', id,productInfo)
                return {
                    url: `/product/${id}`,
                    method: 'PATCH',
                    body: productInfo,
                };
            },
            invalidatesTags: ['products']
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['products'],
        }),


    })
})

export const { useGetAllProductsQuery, useGetProductByIdQuery, useGetProductsByShopIdQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation, useGetFlashProductsQuery } = productApi;
