"use client";

import { store } from "@/Redux/features/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <Provider store={store}>{children}</Provider>
        </SessionProvider>
    );
};

export default Providers;
