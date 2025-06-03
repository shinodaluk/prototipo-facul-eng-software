import { Equipamentos } from "@/app/Types";
import { equipamentoAtom } from "@/state/atoms";
import { GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useAtomValue } from "jotai";
import React, { useCallback, useMemo } from "react";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const EquipamentosTabela = ({ id }: { id: number }) => {
    const equipamentosGeral = useAtomValue(equipamentoAtom);
    const equipamentosEmpresa = equipamentosGeral.filter((equip) => equip.id_empre === id);

    const columns: GridColDef<Equipamentos>[] = useMemo(
        () => [
            { field: "id_eqp", headerName: "ID", width: 50 },
            { field: "nome_eqp", headerName: "Nome", flex: 1 },
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

    const getRowId: GridRowIdGetter<Equipamentos> = useCallback((row) => row.id_eqp, []);

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

export default EquipamentosTabela;
