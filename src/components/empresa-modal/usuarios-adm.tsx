import { UsuarioAdministrador } from "@/app/Types";
import { usuarioAdministradorAtom } from "@/state/atoms";
import { GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useAtomValue } from "jotai";
import React, { useCallback, useMemo } from "react";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const UsuariosAdminTabela = ({ id }: { id: number }) => {
    const usuariosAdm = useAtomValue(usuarioAdministradorAtom);
    const usuariosAdmEmpresa = usuariosAdm.filter((usuario) => usuario.id_empre === id);

    const columns: GridColDef<UsuarioAdministrador>[] = useMemo(
        () => [
            { field: "id_adm", headerName: "ID", width: 50 },
            { field: "nome_adm", headerName: "Nome", flex: 1 },
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

    const getRowId: GridRowIdGetter<UsuarioAdministrador> = useCallback((row) => row.id_adm, []);

    return <DataGrid rows={usuariosAdmEmpresa} columns={columns} getRowId={getRowId} />;
};

export default UsuariosAdminTabela;
