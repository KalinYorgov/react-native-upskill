import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginUser as loginUserService, signUpUser as signUpUserService, logout as logoutService, refreshToken } from '../../services/authentication';

interface User {
    email: string;
    name: string;
    token: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }) => {
        const response = await loginUserService(email, password);
        return {
            email,
            name: email.split('@')[0],
            token: response.token
        };
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async ({ firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }) => {
        const response = await signUpUserService({ firstName, lastName, email, password });
        return {
            email,
            name: `${firstName} ${lastName}`,
            token: response.token
        };
    }
);

export const refreshSession = createAsyncThunk(
    'auth/refreshSession',
    async () => {
        const token = await refreshToken();
        if (!token) {
            throw new Error('Failed to refresh token');
        }
        return token;
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await logoutService();
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        updateToken: (state, action: PayloadAction<string>) => {
            if (state.user) {
                state.user.token = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Registration failed';
            })
            .addCase(refreshSession.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.token = action.payload;
                }
            })
            .addCase(refreshSession.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.error = null;
            });
    }
});

export const { setError, clearError, updateToken } = authSlice.actions;
export default authSlice.reducer;