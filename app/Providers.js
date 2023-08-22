"use client";

import {SessionProvider} from "next-auth/react";
import { children } from "react";

export const AuthProvider = ({children}) => {
    return <SessionProvider>{children}</SessionProvider>
}