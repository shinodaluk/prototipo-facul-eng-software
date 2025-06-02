"use client";

import React, { useState } from "react";
import { NextAppProvider } from "@toolpad/core/nextjs";
import LinearProgress from "@mui/material/LinearProgress";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import BlenderIcon from "@mui/icons-material/Blender";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GavelIcon from "@mui/icons-material/Gavel";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useAtomValue } from "jotai";
import { userTypeAtom } from "@/state/atoms";
import { DevTools } from "jotai-devtools";
import { isAdmin, isDev, isUser, isUsers } from "@/utils/menu-utils";
import "jotai-devtools/styles.css";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [mounted, setMounted] = useState(false);
    const userType = useAtomValue(userTypeAtom);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <LinearProgress />;
    }

    return (
        <>
            <NextAppProvider
                navigation={[
                    {
                        segment: "dashboard",
                        title: "Home",
                        icon: <HomeIcon />,
                    },
                    ...isDev([
                        {
                            segment: "dashboard/empresas",
                            title: "Empresas",
                            icon: <BusinessIcon />,
                        },
                        {
                            segment: "dashboard/usuarios-administrativos",
                            title: "Usuários Administrativos",
                            icon: <PeopleIcon />,
                        },
                    ]),
                    ...isAdmin([
                        {
                            segment: "dashboard/usuarios-solicitantes",
                            title: "Usuários Solicitantes",
                            icon: <PeopleIcon />,
                        },
                    ]),
                    ...isUsers(
                        [
                            {
                                segment: "dashboard/equipamentos",
                                title: "Equipamentos e Insumos",
                                icon: <BlenderIcon />,
                            },
                            {
                                segment: "dashboard/emprestimos",
                                title: "Empréstimos",
                                icon: <WorkHistoryIcon />,
                            },
                            {
                                segment: "dashboard/relatorios",
                                title: "Relatórios",
                                icon: <SummarizeIcon />,
                            },
                            {
                                segment: "dashboard/ocorrencias",
                                title: "Ocorrências",
                                icon: <GavelIcon />,
                            },
                        ],
                        ["adm", "geral"]
                    ),
                    ...isAdmin([
                        {
                            segment: "dashboard/solicitacoes",
                            title: "Solicitações",
                            icon: <ListAltIcon />,
                        },
                    ]),
                    {
                        segment: "dashboard/perfil",
                        title: "Perfil",
                        icon: <ManageAccountsIcon />,
                    },
                    ...isAdmin([
                        {
                            segment: "dashboard/applicativo-de-rastreio",
                            title: "Aplicativo de Rastreio",
                            icon: <QrCodeScannerIcon />,
                        },
                    ]),
                ]}
            >
                {children}
            </NextAppProvider>
            <DevTools />
        </>
    );
};

export default Layout;
