import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



interface AuthState {
    user: { email: string | null };
    token: string | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    user: { email: localStorage.getItem("userEmail") || null },
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token"),
};

export const logIn = createAsyncThunk(
    'auth/login',
    async (credentials: any, thunkAPI) => {
        try {
            const mockResponse = {
                user: { email: credentials.email },
                token: "mock-token-12345"
            };
            localStorage.setItem("token", mockResponse.token);
            localStorage.setItem("userEmail", credentials.email);
            return mockResponse;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const register = createAsyncThunk(
    'auth/register', 
    async (credentials: any, thunkAPI) => {
        try {
            const mockResponse = {
                user: { email: credentials.email },
                token: "mock-token-12345"
            };
            localStorage.setItem("token", mockResponse.token);
            localStorage.setItem("userEmail", credentials.email);
            return mockResponse;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logOut = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(register.fulfilled, (state, action: any) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                localStorage.setItem("userEmail", action.payload.email);
            })
            .addCase(logIn.fulfilled, (state, action: any) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                localStorage.setItem("userEmail", action.payload.email);
            })
            .addCase(logOut.fulfilled, (state) => {
                state.user = { email: null};
                state.token = null;
                state.isLoggedIn = false;
                localStorage.removeItem("userEmail");
                localStorage.removeItem("token");
            })
        
    }
})





export const authReducer = authSlice.reducer