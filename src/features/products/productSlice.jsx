import { createSlice } from "@reduxjs/toolkit";

// src/features/products/productSlice.jsx


const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Set all products (called from action)
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Optional: manual filter (e.g., by search)
    filterBySearch: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.title.toLowerCase().includes(query)
      );
    },

    // Reset to all products
    clearFilter: (state) => {
      state.filteredProducts = state.products;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
    fetchStart: (state) => { state.status = 'loading'; },
    fetchSuccess: (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    },
    fetchFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  },
});

export const { setProducts, filterBySearch, clearFilter, setLoading, setError,fetchStart, fetchSuccess, fetchFailure  } = productSlice.actions;
export default productSlice.reducer;



