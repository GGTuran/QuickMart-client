import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authSlice from './features/auth/authSlice';
import storage from 'redux-persist/lib/storage';
import couponSlice from './features/coupon/couponSlice';
import cartSlice from './features/cart/cartSlice';
import comparisonSlice from './features/comparison/comparisonSlice';
import recentlyViewedSlice from "./features/recent/recentViewed";




const persistConfig = {
  key: 'auth',
  storage,

};

const cartPersistConfig = {
  key: 'cart',
  storage,
};

const recentlyViewedPersistConfig = {
  key: 'recentlyViewed',
  storage,
};


const persistedAuthReducer = persistReducer(persistConfig, authSlice);
const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);
const persistedRecentlyViewedReducer = persistReducer(recentlyViewedPersistConfig, recentlyViewedSlice);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    coupon: couponSlice,
    cart: persistedCartReducer,
    comparison: comparisonSlice,
    recentlyViewed: persistedRecentlyViewedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);