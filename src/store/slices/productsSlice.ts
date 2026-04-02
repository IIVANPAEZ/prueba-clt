import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Product} from '../../types/Product';
import {fetchProducts, searchProducts} from '../../api/productsApi';

const LIMIT = 10;

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  hasMore: boolean;
  searchQuery: string;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  page: 0,
  hasMore: true,
  searchQuery: '',
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, {getState}) => {
    const state = getState() as {products: ProductsState};
    const {page, searchQuery} = state.products;
    const skip = page * LIMIT;

    if (searchQuery.trim()) {
      return searchProducts(searchQuery, LIMIT, skip);
    }
    return fetchProducts(LIMIT, skip);
  },
);

export const searchByQuery = createAsyncThunk(
  'products/searchByQuery',
  async (query: string) => {
    if (query.trim()) {
      return {data: await searchProducts(query, LIMIT, 0), query};
    }
    return {data: await fetchProducts(LIMIT, 0), query};
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts(state) {
      state.items = [];
      state.page = 0;
      state.hasMore = true;
      state.status = 'idle';
      state.error = null;
      state.searchQuery = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const {products, total, skip} = action.payload;
        state.items = state.page === 0 ? products : [...state.items, ...products];
        state.hasMore = skip + products.length < total;
        state.page += 1;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error al cargar productos';
      })
      .addCase(searchByQuery.pending, state => {
        state.status = 'loading';
        state.error = null;
        state.items = [];
        state.page = 0;
        state.hasMore = true;
      })
      .addCase(searchByQuery.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const {data, query} = action.payload;
        state.searchQuery = query;
        state.items = data.products;
        state.hasMore = data.skip + data.products.length < data.total;
        state.page = 1;
      })
      .addCase(searchByQuery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error al buscar productos';
      });
  },
});

export const {resetProducts} = productsSlice.actions;
export default productsSlice.reducer;
