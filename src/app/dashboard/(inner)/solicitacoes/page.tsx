"use client";

import { DataGrid, GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useAtom, useAtomValue } from "jotai";
import { empresaIdAtom, solicitacaoAtom } from "@/state/atoms";
import { Solicitacoes } from "@/app/Types";
import { PageContainer, PageHeader, PageHeaderToolbar } from "@toolpad/core/PageContainer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function Page() {
    const empresa = useAtomValue(empresaIdAtom);
    const [solicitacaoGeral, setSolicitacaoGeral] = useAtom(solicitacaoAtom);
    const [editId, setEditId] = useState<number | null | undefined>(undefined);

    const toggleStatus = useCallback(
        (id: number) => {
            setSolicitacaoGeral(solicitacaoGeral.map((sol) => (sol.id_sol === id ? { ...sol, status: !sol.status } : sol)));
        },
        [solicitacaoGeral]
    );

    const columns: GridColDef<Solicitacoes>[] = useMemo(
        () => [
            { field: "id_sol", headerName: "ID", width: 50 },
            { field: "titulo", headerName: "Título", flex: 1 },
            { field: "descricao", headerName: "Descrição", flex: 1 },
            { field: "resposta", headerName: "Resposta", flex: 1 },
            {
                field: "data_sol",
                headerName: "Solicitado em",
                flex: 1,
                renderCell: ({ row }) => {
                    const date = new Date(row.data_sol);
                    return date.toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    });
                },
            },
            {
                field: "data_finalizacao",
                headerName: "Finalizado em",
                flex: 1,
                renderCell: ({ row }) => {
                    if(!row.data_finalizacao) return "Pendente";

                    const date = new Date(row.data_finalizacao);
                    return date.toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    });
                },
            },
            {
                field: "status",
                headerName: "Status",
                maxWidth: 120,
                flex: 1,
                renderCell: ({ row }) =>
                    row.status ? (
                        <Chip icon={<CheckIcon />} label="Habilitado" color="info" size="small" onClick={() => toggleStatus(row.id_sol)} />
                    ) : (
                        <Chip icon={<CloseIcon />} label="Cancelado" color="error" size="small" onClick={() => toggleStatus(row.id_sol)} />
                    ),
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
                        <IconButton
                            size="small"
                            onClick={() => {
                                setEditId(row.id_sol);
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                            <DeleteIcon />
                        </IconButton>
                        {!row.data_finalizacao && (
                            <Tooltip title="Dar baixa">
                                <IconButton
                                    size="small"
                                >
                                    <FileDownloadIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </>
                ),
            },
        ],
        [toggleStatus]
    );

    const getRowId: GridRowIdGetter<Solicitacoes> = useCallback((row) => row.id_sol, []);

    const CustomPageToolbarComponent = useCallback(() => (<PageHeaderToolbar>
        <Button variant="contained" onClick={() => setEditId(null)}>Cadastrar</Button>
    </PageHeaderToolbar>), [])

    const PageHeaderCustom = useCallback(() => <PageHeader slots={{ toolbar: CustomPageToolbarComponent }} />, [CustomPageToolbarComponent])

    return (
        <PageContainer slots={{ header: PageHeaderCustom }}>
            <DataGrid
                rows={solicitacaoGeral.filter((equip) => equip.id_empre === empresa)}
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
