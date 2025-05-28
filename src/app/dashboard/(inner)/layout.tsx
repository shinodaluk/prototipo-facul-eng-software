import React from "react";
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <DashboardLayout>
            <PageContainer>{children}</PageContainer>
        </DashboardLayout>
    );
};

export default Layout;
