"use client";

import React, { useCallback } from "react";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useAtom, useAtomValue } from "jotai";
import { errorAllAtom, isGeneratingAtom, userTypeAtom } from "@/state/atoms";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import { GenerateData, resetData } from "@/utils/generate-data";
import RestorePageIcon from '@mui/icons-material/RestorePage';
import ClearIcon from '@mui/icons-material/Clear';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [errorAll, setErrorAll] = useAtom(errorAllAtom);
    const [userType, setUserType] = useAtom(userTypeAtom);
    const isGenerating = useAtomValue(isGeneratingAtom);

    const toolbarActions = useCallback(
        () => (
            <Stack direction="row" gap={2}>
                <ButtonGroup variant="contained" aria-label="Basic button group" size="small">
                    <Button  size="small" onClick={GenerateData} loading={isGenerating} title="gerar dados">
                        <RestorePageIcon />
                    </Button >
                    <Button  size="small" onClick={resetData} disabled={isGenerating} title="apagar dados">
                        <ClearIcon />
                    </Button >
                </ButtonGroup>
                <FormControlLabel
                    control={<Checkbox size="small" name="remember" checked={errorAll} onChange={() => setErrorAll(!errorAll)} />}
                    label="Falhar"
                    slotProps={{
                        typography: {
                            className: "text-gray-500 text-sm font-normal",
                        },
                    }}
                />
                <TextField
                    select
                    label="Tipo de Usuário"
                    value={userType}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setUserType(event.target.value as "dev" | "adm" | "geral");
                    }}
                    size="small"
                >
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
        ),
        [userType, errorAll]
    );

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
            {children}
        </DashboardLayout>
    );
};

export default Layout;
