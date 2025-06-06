"use client";

import { DataGrid, GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useAtom, useAtomValue } from "jotai";
import { empresaAtom, usuarioAdministradorAtom } from "@/state/atoms";
import { UsuarioAdministrador } from "@/app/Types";
import { PageContainer, PageHeader, PageHeaderToolbar } from "@toolpad/core/PageContainer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EditarUsuario from "@/components/editar-usuario";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Page() {
    const [usuariosAdm, setUsuariosAdm] = useAtom(usuarioAdministradorAtom);
    const empresasGeral = useAtomValue(empresaAtom);
    const [editId, setEditId] = useState<number | null | undefined>(undefined);

    const toggleStatus = useCallback(
        (id: number) => {
            setUsuariosAdm(usuariosAdm.map((usuario) => (usuario.id_adm === id ? { ...usuario, status: !usuario.status } : usuario)));
        },
        [usuariosAdm]
    );

    const columns: GridColDef<UsuarioAdministrador>[] = useMemo(
        () => [
            { field: "id_adm", headerName: "ID", width: 50 },
            { field: "nome_adm", headerName: "Nome", flex: 1 },
            { field: "login", headerName: "E-mail", flex: 1 },
            {
                field: "id_empre",
                headerName: "Empresa",
                flex: 1,
                renderCell: ({ row }) => {
                    const empresa = empresasGeral.find((emp) => emp.id_empre === row.id_empre);
                    return empresa ? empresa.nome_empre : "Empresa não encontrada";
                },
            },
            {
                field: "status",
                headerName: "Status",
                maxWidth: 120,
                flex: 1,
                renderCell: ({ row }) =>
                    row.status ? (
                        <Chip icon={<CheckIcon />} label="Habilitado" color="success" size="small" onClick={() => toggleStatus(row.id_adm)} />
                    ) : (
                        <Chip icon={<CloseIcon />} label="Desabilitado" color="error" size="small" onClick={() => toggleStatus(row.id_adm)} />
                    ),
            },
            {
                field: "options",
                headerName: "Opções",
                maxWidth: 150,
                flex: 1,
                renderCell: ({ row }) => (
                    <>
                        <IconButton
                            size="small"
                        >
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => {
                                setEditId(row.id_adm);
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                            <DeleteIcon />
                        </IconButton>
                    </>
                ),
            },
        ],
        [empresasGeral, toggleStatus]
    );

    const getRowId: GridRowIdGetter<UsuarioAdministrador> = useCallback((row) => row.id_adm, []);

    const CustomPageToolbarComponent = useCallback(() => (<PageHeaderToolbar>
        <Button variant="contained" onClick={() => setEditId(null)}>Cadastrar</Button>
    </PageHeaderToolbar>), [])

    const PageHeaderCustom = useCallback(() => <PageHeader slots={{ toolbar: CustomPageToolbarComponent }} />, [CustomPageToolbarComponent])

    return (
        <PageContainer slots={{ header: PageHeaderCustom }}>
            <DataGrid
                rows={usuariosAdm}
                columns={columns}
                getRowId={getRowId}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10, 20]}
                showToolbar
            />
            {editId !== undefined && <EditarUsuario id={editId} handleClose={() => setEditId(undefined)} />}
        </PageContainer>
    );
}
