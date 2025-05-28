import React from "react";
import { NextAppProvider } from "@toolpad/core/nextjs";
import LinearProgress from "@mui/material/LinearProgress";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <React.Suspense fallback={<LinearProgress />}>
            <NextAppProvider>{children}</NextAppProvider>
        </React.Suspense>
    );
};

export default Layout;
