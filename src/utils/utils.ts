import { TProduct } from '@/types/product.interface';
import axios from 'axios';


export const fetchProductById = async (id: string): Promise<TProduct> => {
    const response = await axios.get<TProduct>(`https://mart-server.vercel.app/api/product/${id}`);
    return response.data;
};