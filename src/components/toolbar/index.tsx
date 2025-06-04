"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useAtom, useAtomValue } from "jotai";
import {
    empresaAtom,
    empresaIdAtom,
    errorAllAtom,
    isGeneratingAtom,
    userTypeAtom,
    usuarioAdministradorAtom,
    usuarioGeralAtom,
    usuarioIdAtom,
} from "@/state/atoms";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { GenerateData, resetData } from "@/utils/generate-data";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import ClearIcon from "@mui/icons-material/Clear";
import Autocomplete from "@mui/material/Autocomplete";
import { Empresa } from "@/app/Types";

const Toolbar = () => {
    const router = useRouter()
    const [errorAll, setErrorAll] = useAtom(errorAllAtom);
    const [userType, setUserType] = useAtom(userTypeAtom);
    const [empresaId, setEmpresaId] = useAtom(empresaIdAtom);
    const [usuarioId, setUsuarioId] = useAtom(usuarioIdAtom);
    const isGenerating = useAtomValue(isGeneratingAtom);

    const empresas = useAtomValue(empresaAtom);
    const usuariosAdm = useAtomValue(usuarioAdministradorAtom).filter((empresa) => empresa.id_empre === empresaId);
    const usuariosGeral = useAtomValue(usuarioGeralAtom).filter((empresa) => empresa.id_empre === empresaId);

    useEffect(() => {
        if (userType === "adm") {
            if (!usuariosAdm.map((user) => user.id_adm).includes(usuarioId)) {
                setUsuarioId(usuariosAdm.length > 0 ? usuariosAdm[0].id_adm : 1);
            }
        }
        if (userType === "geral") {
            if (!usuariosGeral.map((user) => user.id_usug).includes(usuarioId)) {
                setUsuarioId(usuariosGeral.length > 0 ? usuariosGeral[0].id_usug : 1);
            }
        }
    }, [empresaId, userType]);

    return (
        <Stack direction="row" gap={2}>
            <ButtonGroup variant="contained" aria-label="Basic button group" size="small">
                <Button size="small" onClick={GenerateData} loading={isGenerating} title="gerar dados">
                    <RestorePageIcon />
                </Button>
                <Button size="small" onClick={resetData} disabled={isGenerating} title="apagar dados">
                    <ClearIcon />
                </Button>
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
                    router.push('/dashboard')
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
            {userType !== "dev" && (
                <>
                    <Autocomplete<Empresa>
                        size="small"
                        value={empresas.find((empresa) => empresa.id_empre === empresaId) ?? null}
                        options={empresas}
                        sx={{ width: 200 }}
                        getOptionLabel={(option) => `${option.id_empre} - ${option.nome_empre}`}
                        renderInput={(params) => <TextField {...params} label="Empresa" />}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                setEmpresaId(newValue.id_empre);
                            }
                        }}
                    />
                    <Autocomplete<number>
                        size="small"
                        value={
                            (userType === "adm"
                                ? usuariosAdm.find((usu) => usu.id_adm === usuarioId)?.id_adm
                                : usuariosGeral.find((usu) => usu.id_usug === usuarioId)?.id_usug) ?? null
                        }
                        options={userType === "adm" ? usuariosAdm.map((usu) => usu.id_adm) : usuariosGeral.map((usu) => usu.id_usug)}
                        sx={{ width: 200 }}
                        getOptionLabel={(option) => `${option}`}
                        renderInput={(params) => <TextField {...params} label={userType === "adm" ? "Administrador" : "Usuário"} />}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                setUsuarioId(newValue);
                            }
                        }}
                        isOptionEqualToValue={(option, value) => option === value}
                    />
                </>
            )}
            <ThemeSwitcher />
        </Stack>
    );
};

export default Toolbar;
