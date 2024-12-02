import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (searchTerm = '', category = '') => ({
                url: `/product`,
                method: 'GET',
                params: { searchTerm, category },
            }),
            providesTags: ['products'],
        }),
        // getBikeById: builder.query({
        //     query: (id) => ({
        //         url:`/bikes/${id}`,
        //         method: 'GET',
        //     }),
        //     providesTags: ['bikes'],
        // }),
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

export const { useGetAllProductsQuery } = productApi;
