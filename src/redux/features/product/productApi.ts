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
        // addBike: builder.mutation({
        //     query:(bikeInfo) => {
        //         // console.log('from base api=>', bikeInfo);
        //         return{
        //             url: `/bikes`,
        //             method: 'POST',
        //             body: bikeInfo,
        //         }
        //     },
        //     invalidatesTags: ['bikes'],
        // }),
        // updateBike: builder.mutation({
        //     query: ({id, bikeInfo}) => {
        //         // console.log('from base api', id,bikeInfo)
        //         return {
        //             url: `/bikes/${id}`,
        //             method: 'PATCH',
        //             body: bikeInfo,
        //         };
        //     },
        //     invalidatesTags: ['bikes']
        // }),
        // deleteBike: builder.mutation({
        //     query: (id) => ({
        //         url: `/bikes/${id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['bikes'],
        // }),


    })
})

export const { useGetAllProductsQuery, useGetProductByIdQuery, useGetProductsByShopIdQuery } = productApi;
