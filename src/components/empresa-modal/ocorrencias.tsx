import { Ocorrencias } from "@/app/Types";
import { equipamentoAtom, ocorrenciaAtom } from "@/state/atoms";
import { GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useAtomValue } from "jotai";
import React, { useCallback, useMemo } from "react";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const OcorrenciasTabela = ({ id }: { id: number }) => {
    const ocorrenciasGeral = useAtomValue(ocorrenciaAtom);
    const ocorrenciasEmpresa = ocorrenciasGeral.filter((ocor) => ocor.id_oc === id);

    const columns: GridColDef<Ocorrencias>[] = useMemo(
        () => [
            { field: "id_oc", headerName: "ID", width: 50 },
            { field: "titulo", headerName: "Titulo", flex: 1 },
            { field: "descriacao_oc", headerName: "Descrição", flex: 1 },
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

    const getRowId: GridRowIdGetter<Ocorrencias> = useCallback((row) => row.id_oc, []);

    return (
        <DataGrid
            rows={ocorrenciasEmpresa}
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

export default OcorrenciasTabela;
