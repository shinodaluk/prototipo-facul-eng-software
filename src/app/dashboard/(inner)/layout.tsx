"use client";

import React, { useCallback } from "react";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useAtom } from "jotai";
import { errorAllAtom, userTypeAtom } from "@/state/atoms";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [errorAll, setErrorAll] = useAtom(errorAllAtom);
    const [userType, setUserType] = useAtom(userTypeAtom);

    const toolbarActions = useCallback(() => (
        <Stack direction="row" gap={2}>
            <FormControlLabel
                control={<Checkbox size="small" name="remember" checked={errorAll} onChange={() => setErrorAll(!errorAll)} />}
                label="Falhar"
                slotProps={{
                    typography: {
                        className: "text-gray-500 text-sm font-normal",
                    },
                }}
            />
            <TextField select label="Tipo de Usuário" value={userType} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserType(event.target.value as "dev" | "adm" | "geral");
            }} size="small">
                <MenuItem key="dev" value="dev">
                    Usuário Desenvolvedor
                </MenuItem>
                <MenuItem key="adm" value="adm">
                    Usuário Administrador
                </MenuItem>
                <MenuItem key="geral" value="geral">
                    Usuário Solicitante
                </MenuItem>
            </TextField>
            <ThemeSwitcher />
        </Stack>
    ), [userType, errorAll]);

    return (
        <DashboardLayout
            branding={{
                logo: <h1 className="text-3xl font-bold text-center">Equipa+</h1>,
                title: "",
                homeUrl: "/dashboard",
            }}
            slots={{
                toolbarActions,
            }}
        >
            <PageContainer>{children}</PageContainer>
        </DashboardLayout>
    );
};

export default Layout;
