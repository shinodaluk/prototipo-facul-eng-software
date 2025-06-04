"use client";

import { useCallback, useMemo } from "react";
import { DataGrid, GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useAtomValue } from "jotai";
import { Emprestimo } from "@/app/Types";
import { empresaIdAtom, emprestimoAtom, equipEmprestimoAtom, usuarioGeralAtom, usuarioGeralEmprestimoAtom } from "@/state/atoms";
import { isAfter } from "date-fns";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function EmprestimosVencidos() {
    const empresa = useAtomValue(empresaIdAtom);
    const emprestimoGeral = useAtomValue(emprestimoAtom);
    const usuariosEmprestimosGeral = useAtomValue(usuarioGeralEmprestimoAtom);
    const equipEmprestimoGeral = useAtomValue(equipEmprestimoAtom);
    const usuariosGeral = useAtomValue(usuarioGeralAtom);
    const usuariosGeralEmpresa = usuariosGeral.filter((usuario) => usuario.id_empre === empresa);

    const columns: GridColDef<Emprestimo>[] = useMemo(
        () => [
            { field: "id_emp", headerName: "ID", width: 50 },
            {
                field: "data_emp",
                headerName: "Data do empréstimo",
                flex: 1,
                renderCell: ({ row }) => {
                    const date = new Date(row.data_emp);
                    return date.toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    });
                },
            },
            {
                field: "data_dev",
                headerName: "Data da devolução",
                flex: 1,
                renderCell: ({ row }) => {
                    const date = new Date(row.data_dev);
                    return date.toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    });
                },
            },
            {
                field: "qnt_prod",
                headerName: "Quantidade de Equipamentos",
                flex: 1,
                renderCell: ({ row }) =>
                    equipEmprestimoGeral.filter(
                        (equip) => equip.id_emp === row.id_emp
                    ).length,
            },
            {
                field: "status",
                headerName: "Status",
                maxWidth: 150,
                flex: 1,
                renderCell: ({ row }) => {
                    if (isAfter(new Date(), row.data_dev) && !row.status) {
                        return (
                            <Chip
                                icon={<CloseIcon />}
                                label="Atrasado"
                                color="error"
                                size="small"
                            />
                        );
                    }

                    return row.status ? (
                        <Chip
                            icon={<CheckIcon />}
                            label="Devolvido"
                            color="success"
                            size="small"
                        />
                    ) : (
                        <Chip
                            icon={<CloseIcon />}
                            label="Emprestado"
                            color="warning"
                            size="small"
                        />
                    );
                },
            },
            {
                field: "users",
                headerName: "Usuário Solicitante",
                flex: 1,
                renderCell: ({ row }) => {
                    const usuariosEmprestimoIds = usuariosEmprestimosGeral
                        .filter((usu_emp) => usu_emp.id_emp === row.id_emp)
                        .map(
                            (usu_emp) =>
                                usuariosGeralEmpresa.find(
                                    (usu) => usu.id_usug === usu_emp.id_usug
                                )?.nome
                        );

                    return (
                        <>
                            {usuariosEmprestimoIds.map((nome) => (
                                <Chip label={nome} key={nome} />
                            ))}
                        </>
                    );
                },
            },
        ],
        [usuariosGeralEmpresa, equipEmprestimoGeral]
    );

    const getRowId: GridRowIdGetter<Emprestimo> = useCallback((row) => row.id_emp, []);

    return (
        <Grid width="50%" spacing={2}>
            <Typography variant="h5">Empréstimos vencidos</Typography>
            <DataGrid
                rows={emprestimoGeral.filter((equip) => equip.id_empre === empresa && !equip.status && isAfter(new Date(), new Date(equip.data_dev)))}
                columns={columns}
                getRowId={getRowId}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10, 20]}
            />
        </Grid>
    );
}
