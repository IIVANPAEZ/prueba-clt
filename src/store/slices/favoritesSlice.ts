import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product} from '../../types/Product';

const FAVORITES_KEY = '@favorites';

interface FavoritesState {
  ids: number[];
  entities: Record<number, Product>;
}

const initialState: FavoritesState = {
  ids: [],
  entities: {},
};

export const loadFavorites = createAsyncThunk(
  'favorites/loadFavorites',
  async () => {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    if (data) {
      return JSON.parse(data) as FavoritesState;
    }
    return initialState;
  },
);

const persistFavorites = async (state: FavoritesState) => {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(state));
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const index = state.ids.indexOf(product.id);
      if (index >= 0) {
        state.ids.splice(index, 1);
        delete state.entities[product.id];
      } else {
        state.ids.push(product.id);
        state.entities[product.id] = product;
      }
      persistFavorites({ids: state.ids, entities: state.entities});
    },
  },
  extraReducers: builder => {
    builder.addCase(loadFavorites.fulfilled, (state, action) => {
      state.ids = action.payload.ids;
      state.entities = action.payload.entities;
    });
  },
});

export const {toggleFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
