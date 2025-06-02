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
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmpresaModal from "@/components/empresa-modal";

export default function Page() {
    const [empresas, setEmpresas] = useAtom(empresaAtom);
    const [id, setId] = useState<number | null>(null);

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
                maxWidth: 120,
                flex: 1,
                renderCell: ({ row }) => (
                    <>
                        <IconButton
                            size="small"
                            onClick={() => {
                                setId(row.id_empre);
                            }}
                        >
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => {
                                setId(row.id_empre);
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    </>
                ),
            },
        ],
        [toggleStatus]
    );

    const getRowId: GridRowIdGetter<any> = useCallback((row) => row.id_empre, []);

    return (
        <>
            <DataGrid rows={empresas} columns={columns} getRowId={getRowId} />
            {id && <EmpresaModal id={id} handleClose={() => setId(null)} />}
        </>
    );
}
