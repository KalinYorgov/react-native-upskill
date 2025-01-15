import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import accountReducer from './account/slice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        account: accountReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;