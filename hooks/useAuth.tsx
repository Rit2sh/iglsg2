"use client";

import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { fetchUser } from "@/app/Redux/slice/User.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function useAuth() {
    const { user, loading, initialized } = useSelector(
        (state: RootState) => state.auth
    );

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (!user) {
            dispatch(fetchUser());
        }
    }, [dispatch, user]);

    return {
        user,
        loading,
        isAuthenticated: !!user,
        initialized,
    };
}