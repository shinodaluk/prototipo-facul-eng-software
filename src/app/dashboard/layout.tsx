"use client";

import React, { useState } from "react";
import { NextAppProvider } from "@toolpad/core/nextjs";
import LinearProgress from "@mui/material/LinearProgress";
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import BlenderIcon from '@mui/icons-material/Blender';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [mounted, setMounted] = useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <LinearProgress />;
    }

    return (
        <NextAppProvider
            navigation={[
                {
                    segment: "",
                    title: "Home",
                    icon: <HomeIcon />,
                },
                {
                    segment: "empresas",
                    title: "Empresas",
                    icon: <BusinessIcon />,
                },
                {
                    segment: "usuarios-administrativos",
                    title: "Usuários Administrativos",
                    icon: <PeopleIcon />,
                },
                {
                    segment: "usuarios-solicitantes",
                    title: "Usuários Solicitantes",
                    icon: <PeopleIcon />,
                },
                {
                    segment: "equipamentos",
                    title: "Equipamentos e Insumos",
                    icon: <BlenderIcon />,
                },
                {
                    segment: "emprestimos",
                    title: "Empréstimos",
                    icon: <WorkHistoryIcon />,
                },
            ]}
        >
            {children}
        </NextAppProvider>
    );
};

export default Layout;
