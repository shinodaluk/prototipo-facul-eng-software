import { Emprestimo } from "@/app/Types";
import { emprestimoAtom, usuarioGeralAtom, usuarioGeralEmprestimoAtom } from "@/state/atoms";
import { GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useAtomValue } from "jotai";
import React, { useCallback, useMemo } from "react";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { isAfter } from "date-fns";

const EmprestimosTabela = ({ id }: { id: number }) => {
    const emprestimosGeral = useAtomValue(emprestimoAtom);
    const usuariosGeral = useAtomValue(usuarioGeralAtom);
    const usuariosEmprestimosGeral = useAtomValue(usuarioGeralEmprestimoAtom);
    const emprestimosEmpresa = emprestimosGeral.filter((usuario) => usuario.id_empre === id);
    const usuariosGeralEmpresa = usuariosGeral.filter((usuario) => usuario.id_empre === id);

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
                field: "status",
                headerName: "Status",
                maxWidth: 120,
                flex: 1,
                renderCell: ({ row }) => {
                    if (isAfter(row.data_dev, row.data_emp) && !row.status) {
                        return <Chip icon={<CloseIcon />} label="Devolução atrasada" color="error" size="small" />;
                    }

                    return row.status ? (
                        <Chip icon={<CheckIcon />} label="Devolvido" color="success" size="small" />
                    ) : (
                        <Chip icon={<CloseIcon />} label="Emprestado" color="warning" size="small" />
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
                        .map((usu_emp) => usuariosGeralEmpresa.find((usu) => usu.id_usug === usu_emp.id_usug)?.nome)

                    return <>{usuariosEmprestimoIds.map((nome) => (<Chip label={nome} key={nome} />))}</>
                },
            },
        ],
        []
    );

    const getRowId: GridRowIdGetter<Emprestimo> = useCallback((row) => row.id_emp, []);

    return (
        <DataGrid
            rows={emprestimosEmpresa}
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

export default EmprestimosTabela;
