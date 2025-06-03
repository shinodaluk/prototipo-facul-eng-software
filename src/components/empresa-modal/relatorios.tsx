import { Relatorios } from "@/app/Types";
import { relatorioAtom } from "@/state/atoms";
import { GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useAtomValue } from "jotai";
import React, { useCallback, useMemo } from "react";

const RelatoriosTabela = ({ id }: { id: number }) => {
    const relatoriosGeral = useAtomValue(relatorioAtom);
    const equipamentosEmpresa = relatoriosGeral.filter((rel) => rel.id_empre === id);

    const columns: GridColDef<Relatorios>[] = useMemo(
        () => [
            { field: "id_rel", headerName: "ID", width: 50 },
            { field: "titulo", headerName: "Título", flex: 1 },
            {
                field: "data_geracao",
                headerName: "Data de geração",
                width: 150,
                renderCell: ({ row }) => {
                    const date = new Date(row.data_geracao);
                    return date.toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    });
                },
            },
        ],
        []
    );

    const getRowId: GridRowIdGetter<Relatorios> = useCallback((row) => row.id_rel, []);

    return (
        <DataGrid
            rows={equipamentosEmpresa}
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

export default RelatoriosTabela;
