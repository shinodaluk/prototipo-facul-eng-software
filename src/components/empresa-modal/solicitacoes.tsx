import { Solicitacoes } from "@/app/Types";
import { solicitacaoAtom } from "@/state/atoms";
import { GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useAtomValue } from "jotai";
import React, { useCallback, useMemo } from "react";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const SolicitacoesTabela = ({ id }: { id: number }) => {
    const solicitacoesGeral = useAtomValue(solicitacaoAtom);
    const solicitacoesEmpresa = solicitacoesGeral.filter((sol) => sol.id_empre === id);

    const columns: GridColDef<Solicitacoes>[] = useMemo(
        () => [
            { field: "id_sol", headerName: "ID", width: 50 },
            { field: "titulo", headerName: "Título", flex: 1 },
            { field: "descricao", headerName: "Descrição", flex: 1 },
            { field: "resposta", headerName: "Resposta", flex: 1 },
            {
                field: "data_sol",
                headerName: "Data de solicitação",
                width: 150,
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
                headerName: "Data de Finalização",
                width: 150,
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
                renderCell: ({ row }) => {
                    return row.status ? (
                        <Chip icon={<CheckIcon />} label="Habilitado" color="success" size="small" />
                    ) : (
                        <Chip icon={<CloseIcon />} label="Desabilitado" color="default" size="small" />
                    );
                },
            },
        ],
        []
    );

    const getRowId: GridRowIdGetter<Solicitacoes> = useCallback((row) => row.id_sol, []);

    return (
        <DataGrid
            rows={solicitacoesEmpresa}
            columns={columns}
            getRowId={getRowId}
            initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 20]}
            showToolbar
        />
    );
};

export default SolicitacoesTabela;
