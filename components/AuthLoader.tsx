"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "@/app/Redux/slice/User.slice";
import type { AppDispatch } from "@/app/Redux/store";

export default function AuthLoader() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    return null;
}