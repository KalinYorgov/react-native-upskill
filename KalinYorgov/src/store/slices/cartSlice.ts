import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    size: string;
    thumbnail: string;
}

interface CartState {
    items: CartItem[];
    total: number;
}

const initialState: CartState = {
    items: [],
    total: 0,
};

const CART_STORAGE_KEY = '@cart_storage';

const loadInitialState = async (): Promise<CartState> => {
    try {
        const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : initialState;
    } catch (error) {
        console.error('Error loading cart from storage:', error);
        return initialState;
    }
};

const saveCartToStorage = async (state: CartState) => {
    try {
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error('Error saving cart to storage:', error);
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(
                item => item.id === action.payload.id && item.size === action.payload.size
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }

            state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            saveCartToStorage(state);
        },
        removeFromCart: (state, action: PayloadAction<{ id: string; size: string }>) => {
            state.items = state.items.filter(
                item => !(item.id === action.payload.id && item.size === action.payload.size)
            );
            state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            saveCartToStorage(state);
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; size: string; quantity: number }>) => {
            const item = state.items.find(
                item => item.id === action.payload.id && item.size === action.payload.size
            );
            if (item) {
                item.quantity = action.payload.quantity;
                state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            }
            saveCartToStorage(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            saveCartToStorage(state);
        },
        initializeCart: (state, action: PayloadAction<CartState>) => {
            state.items = action.payload.items;
            state.total = action.payload.total;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, initializeCart } = cartSlice.actions;
export { loadInitialState };
export default cartSlice.reducer;