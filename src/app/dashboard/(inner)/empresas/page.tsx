"use client";

import { DataGrid, GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { useAtom } from "jotai";
import { empresaAtom } from "@/state/atoms";
import { useCallback, useMemo, useState } from "react";
import { Empresa } from "@/app/Types";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { maskBr } from "js-brasil";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmpresaModal from "@/components/empresa-modal";
import { PageContainer, PageHeaderToolbar, PageHeader } from "@toolpad/core/PageContainer";
import Button from "@mui/material/Button";
import EditarEmpresa from "@/components/editar-empresa";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Page() {
    const [empresas, setEmpresas] = useAtom(empresaAtom);
    const [viewId, setViewId] = useState<number | null>(null);
    const [editId, setEditId] = useState<number | null | undefined>(undefined);

    const toggleStatus = useCallback(
        (id: number) => {
            setEmpresas(empresas.map((empresa) => (empresa.id_empre === id ? { ...empresa, status: !empresa.status } : empresa)));
        },
        [empresas]
    );

    const columns: GridColDef<Empresa>[] = useMemo(
        () => [
            { field: "id_empre", headerName: "ID", width: 50 },
            { field: "nome_empre", headerName: "Nome", flex: 1 },
            { field: "cnpj", headerName: "CNPJ", width: 150, renderCell: ({ value }) => maskBr.cnpj(value) },
            {
                field: "status",
                headerName: "Status",
                maxWidth: 120,
                flex: 1,
                renderCell: ({ row }) =>
                    row.status ? (
                        <Chip icon={<CheckIcon />} label="Habilitado" color="success" size="small" onClick={() => toggleStatus(row.id_empre)} />
                    ) : (
                        <Chip icon={<CloseIcon />} label="Desabilitado" color="error" size="small" onClick={() => toggleStatus(row.id_empre)} />
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
                            onClick={() => {
                                setViewId(row.id_empre);
                            }}
                        >
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => {
                                setEditId(row.id_empre);
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

    const getRowId: GridRowIdGetter<any> = useCallback((row) => row.id_empre, []);

    const CustomPageToolbarComponent = useCallback(() => (<PageHeaderToolbar>
        <Button variant="contained" onClick={() => setEditId(null)}>Cadastrar</Button>
    </PageHeaderToolbar>), [])

    const PageHeaderCustom = useCallback(() => <PageHeader slots={{ toolbar: CustomPageToolbarComponent }} />, [CustomPageToolbarComponent])

    return (
        <PageContainer slots={{ header: PageHeaderCustom }}>
            <DataGrid
                rows={empresas}
                columns={columns}
                getRowId={getRowId}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10, 20]}
                showToolbar
            />
            {viewId && <EmpresaModal id={viewId} handleClose={() => setViewId(null)} />}
            {editId !== undefined && <EditarEmpresa id={editId} handleClose={() => setEditId(undefined)} />}
        </PageContainer>
    );
}
