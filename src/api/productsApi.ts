import api from './axiosInstance';
import {ProductsResponse} from '../types/Product';

export const fetchProducts = async (
  limit: number,
  skip: number,
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(
    `/products?limit=${limit}&skip=${skip}`,
  );
  return response.data;
};

export const searchProducts = async (
  query: string,
  limit: number,
  skip: number,
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(
    `/products/search?q=${query}&limit=${limit}&skip=${skip}`,
  );
  return response.data;
};
