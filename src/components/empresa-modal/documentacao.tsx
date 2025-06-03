import { Documentacao } from "@/app/Types";
import { documentacaoAtom, equipamentoAtom } from "@/state/atoms";
import { GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useAtomValue } from "jotai";
import React, { useCallback, useMemo } from "react";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const DocumentacaoTabela = ({ id }: { id: number }) => {
    const documentacoesGeral = useAtomValue(documentacaoAtom);
    const documentacoesEmpresa = documentacoesGeral.filter((docs) => docs.id_empre === id);

    const equipamentosGeral = useAtomValue(equipamentoAtom);

    const columns: GridColDef<Documentacao>[] = useMemo(
        () => [
            { field: "id_doc", headerName: "ID", width: 50 },
            { field: "titulo", headerName: "Título", flex: 1 },
            { field: "link", headerName: "Link", flex: 1 },
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
            {
                field: "id_eqp",
                headerName: "Equipamento",
                maxWidth: 120,
                flex: 1,
                renderCell: ({ row }) => {
                    const equipamento = equipamentosGeral.find((eqp) => eqp.id_eqp === row.id_eqp);
                    return equipamento ? equipamento.nome_eqp : "N/A";
                },
            },
        ],
        []
    );

    const getRowId: GridRowIdGetter<Documentacao> = useCallback((row) => row.id_doc, []);

    return (
        <DataGrid
            rows={documentacoesEmpresa}
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

export default DocumentacaoTabela;
