"use client";

import { DataGrid, GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useAtom, useAtomValue } from "jotai";
import { empresaIdAtom, usuarioGeralAtom } from "@/state/atoms";
import { UsuarioGeral } from "@/app/Types";
import { PageContainer, PageHeader, PageHeaderToolbar } from "@toolpad/core/PageContainer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EditarUsuarioGeral from "@/components/editar-usuario-geral";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Page() {
    const empresa = useAtomValue(empresaIdAtom);
    const [usuariosGeral, setUsuariosGeral] = useAtom(usuarioGeralAtom);
    const [editId, setEditId] = useState<number | null | undefined>(undefined);

    const toggleStatus = useCallback(
        (id: number) => {
            setUsuariosGeral(usuariosGeral.map((usuario) => (usuario.id_usug === id ? { ...usuario, status: !usuario.status } : usuario)));
        },
        [usuariosGeral]
    );

    const columns: GridColDef<UsuarioGeral>[] = useMemo(
        () => [
            { field: "id_usug", headerName: "ID", width: 50 },
            { field: "nome", headerName: "Nome", flex: 1 },
            { field: "email", headerName: "E-mail", flex: 1 },
            {
                field: "status",
                headerName: "Status",
                maxWidth: 120,
                flex: 1,
                renderCell: ({ row }) =>
                    row.status ? (
                        <Chip icon={<CheckIcon />} label="Habilitado" color="success" size="small" onClick={() => toggleStatus(row.id_usug)} />
                    ) : (
                        <Chip icon={<CloseIcon />} label="Desabilitado" color="error" size="small" onClick={() => toggleStatus(row.id_usug)} />
                    ),
            },
            {
                field: "options",
                headerName: "Opções",
                width: 150,
                renderCell: ({ row }) => (
                    <>
                        <IconButton size="small">
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => {
                                setEditId(row.id_usug);
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
        [toggleStatus]
    );

    const getRowId: GridRowIdGetter<UsuarioGeral> = useCallback((row) => row.id_usug, []);

    const CustomPageToolbarComponent = useCallback(
        () => (
            <PageHeaderToolbar>
                <Button variant="contained" onClick={() => setEditId(null)}>
                    Cadastrar
                </Button>
            </PageHeaderToolbar>
        ),
        []
    );

    const PageHeaderCustom = useCallback(() => <PageHeader slots={{ toolbar: CustomPageToolbarComponent }} />, [CustomPageToolbarComponent]);

    return (
        <PageContainer slots={{ header: PageHeaderCustom }}>
            <DataGrid
                rows={usuariosGeral.filter((usuario) => usuario.id_empre === empresa)}
                columns={columns}
                getRowId={getRowId}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10, 20]}
                showToolbar
            />
            {editId !== undefined && <EditarUsuarioGeral id={editId} handleClose={() => setEditId(undefined)} />}
        </PageContainer>
    );
}
