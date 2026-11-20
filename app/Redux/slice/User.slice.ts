import { IUser } from "@/lib/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
    "auth/fetchUser",
    async () => {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        const user = res.data.user;
        if (!user) {
            await axios.post('api/auth/refresh', { withCredentials: true });
            const res2 = await axios.get("/api/auth/me", { withCredentials: true });
            return res2.data.user;
        }
        return user;
    }
);

export interface AuthState {
    user: IUser | null;
    loading: boolean;
    initialized: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: true,
    initialized: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.initialized = true;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.initialized = true;
                if (action.payload === "unauthorized") {
                    state.user = null;
                }
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;