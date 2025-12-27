import authReducer from "../features/auth/authSlice.jsx";
import cartReducer from "../features/cart/cartSlice.jsx";
import productsReducer from "../features/products/productSlice.jsx";
import { configureStore } from "@reduxjs/toolkit";
import  wishlistReducer  from "../features/wishlist/wishlistSlice.jsx";
import ordersReducer from "../features/orders/ordersSlice.jsx"


// Load from localStorage
const loadFromLocalStorage = (key) => {
  try {
    const serialized = localStorage.getItem(key);
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (e) {
    console.warn(`Error loading ${key} from localStorage`, e);
    return undefined;
  }
};

// Save to localStorage
const saveToLocalStorage = (key, state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(key, serialized);
  } catch (e) {
    console.warn(`Error saving ${key} to localStorage`, e);
  }
};

// Load persisted state
const persistedCartState = loadFromLocalStorage('cart');
const persistedAuthState = loadFromLocalStorage('auth');
const persistedWishlistState = loadFromLocalStorage('wishlist');
const persistedOrdersState = loadFromLocalStorage('orders');

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productsReducer,
    wishlist:wishlistReducer,
    orders:ordersReducer,
    
  },
  preloadedState: {
    cart: persistedCartState,
    auth: persistedAuthState,
    wishlist:persistedWishlistState,
    orders:persistedOrdersState,
  },
});

// Subscribe to changes
store.subscribe(() => {
saveToLocalStorage('cart', store.getState().cart);
saveToLocalStorage('auth', store.getState().auth);
saveToLocalStorage('wishlist', store.getState().wishlist);
saveToLocalStorage('orders', store.getState().orders);
});