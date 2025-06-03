import { UsuarioGeral } from "@/app/Types";
import { usuarioGeralAtom } from "@/state/atoms";
import { GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useAtomValue } from "jotai";
import React, { useCallback, useMemo } from "react";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const UsuariosGeralTabela = ({ id }: { id: number }) => {
    const usuariosGeral = useAtomValue(usuarioGeralAtom);
    const usuariosGeralEmpresa = usuariosGeral.filter((usuario) => usuario.id_empre === id);

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
                        <Chip icon={<CheckIcon />} label="Habilitado" color="success" size="small" />
                    ) : (
                        <Chip icon={<CloseIcon />} label="Desabilitado" color="error" size="small" />
                    ),
            },
        ],
        []
    );

    const getRowId: GridRowIdGetter<UsuarioGeral> = useCallback((row) => row.id_usug, []);

    return (
        <DataGrid
            rows={usuariosGeralEmpresa}
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

export default UsuariosGeralTabela;
