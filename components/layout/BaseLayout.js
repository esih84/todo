'use client'
import { SessionProvider } from "next-auth/react";

const BaseLayout = ({children}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

export default BaseLayout;