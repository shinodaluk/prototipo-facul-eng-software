"use client";

import React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Toolbar from "@/components/toolbar";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <DashboardLayout
            branding={{
                logo: <h1 className="text-3xl font-bold text-center">Equipa+</h1>,
                title: "",
                homeUrl: "/dashboard",
            }}
            slots={{
                toolbarActions: Toolbar,
            }}
        >
            {children}
        </DashboardLayout>
    );
};

export default Layout;
