"use client";

import { DataGrid, GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import { useAtomValue } from "jotai";
import { empresaIdAtom, relatorioAtom, userTypeAtom, usuarioIdAtom } from "@/state/atoms";
import { Relatorios } from "@/app/Types";
import { PageContainer, PageHeader, PageHeaderToolbar } from "@toolpad/core/PageContainer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Page() {
    const empresa = useAtomValue(empresaIdAtom);
    const relatiosGeral = useAtomValue(relatorioAtom);
    const [editId, setEditId] = useState<number | null | undefined>(undefined);
        
    const userType = useAtomValue(userTypeAtom);
    const user = useAtomValue(usuarioIdAtom);

    const rows = useMemo(() => {
        return relatiosGeral.filter((equip) => equip.id_empre === empresa);
    } , [relatiosGeral, empresa, userType, user]);

    const columns: GridColDef<Relatorios>[] = useMemo(
        () => [
            { field: "id_rel", headerName: "ID", width: 50 },
            { field: "titulo", headerName: "Título", flex: 1 },
            { field: "conteudo", headerName: "Conteúdo", flex: 1 },
            {
                field: "data_geracao",
                headerName: "Data",
                flex: 1,
                renderCell: ({ row }) => {
                    const date = new Date(row.data_geracao);
                    return date.toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    });
                },
            },
            {
                field: "options",
                headerName: "Opções",
                maxWidth: 180,
                flex: 1,
                renderCell: ({ row }) => (
                    <>
                        <IconButton
                            size="small"
                        >
                            <VisibilityIcon />
                        </IconButton>
                        {userType === "adm" && <IconButton size="small" color="error">
                            <DeleteIcon />
                        </IconButton>}
                    </>
                ),
            },
        ],
        []
    );

    const getRowId: GridRowIdGetter<Relatorios> = useCallback((row) => row.id_rel, []);

    const CustomPageToolbarComponent = useCallback(() => (<PageHeaderToolbar>
        <Button variant="contained" onClick={() => setEditId(null)}>Novo Relatório</Button>
    </PageHeaderToolbar>), [])

    const PageHeaderCustom = useCallback(() => <PageHeader slots={{ toolbar: CustomPageToolbarComponent }} />, [CustomPageToolbarComponent])

    return (
        <PageContainer slots={{ header: PageHeaderCustom }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10, 20]}
                showToolbar
            />
        </PageContainer>
    );
}
