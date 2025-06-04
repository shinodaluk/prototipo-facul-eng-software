"use client";

import { DataGrid, GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useAtom, useAtomValue } from "jotai";
import { empresaIdAtom, emprestimoAtom, equipamentoAtom, ocorrenciaAtom, ocorrenciaEmprestimoAtom, userTypeAtom, usuarioGeralEmprestimoAtom, usuarioIdAtom } from "@/state/atoms";
import { Ocorrencias } from "@/app/Types";
import { PageContainer, PageHeader, PageHeaderToolbar } from "@toolpad/core/PageContainer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditarEquipamento from "@/components/editar-equipamento";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function Page() {
    const empresa = useAtomValue(empresaIdAtom);
    const [ocorrenciaGeral, setOcorrenciaGeral] = useAtom(ocorrenciaAtom);
    const [editId, setEditId] = useState<number | null | undefined>(undefined);
    const equipamentos = useAtomValue(equipamentoAtom);
    const emprestimoGeral = useAtomValue(emprestimoAtom);
    const usuariosEmprestimosGeral = useAtomValue(usuarioGeralEmprestimoAtom);
    const ocorrenciaEmprestimoGeral = useAtomValue(ocorrenciaEmprestimoAtom);
        
    const userType = useAtomValue(userTypeAtom);
    const user = useAtomValue(usuarioIdAtom);

    const toggleStatus = useCallback(
        (id: number) => {
            setOcorrenciaGeral(ocorrenciaGeral.map((oc) => (oc.id_oc === id ? { ...oc, status: !oc.status } : oc)));
        },
        [ocorrenciaGeral]
    );

    const emprestimosUser = useMemo(() => {
        return emprestimoGeral.filter((equip) => equip.id_empre === empresa).
            filter((emp) => {
                if (userType === "adm") return true;
                if (userType === "geral") {
                    return usuariosEmprestimosGeral.some(
                        (usu_emp) => usu_emp.id_usug === user && usu_emp.id_emp === emp.id_emp
                    );
                }
                return false;
            });
    } , [emprestimoGeral, empresa, userType, user]);

    const rows = useMemo(() => {
        return ocorrenciaGeral.filter((occ) => equipamentos.find((eqp) => eqp.id_eqp === occ.id_eqp)?.id_empre === empresa).
            filter((occ) => {
                if (userType === "adm") return true;
                if (userType === "geral") {
                    return ocorrenciaEmprestimoGeral.some(
                        (occ_emp) => occ_emp.id_oc === occ.id_oc && emprestimosUser.some((emp) => emp.id_emp === occ_emp.id_emp)
                    );
                }
                return false;
            });
    } , [emprestimoGeral, empresa, userType, user]);

    const columns: GridColDef<Ocorrencias>[] = useMemo(
        () => [
            { field: "id_oc", headerName: "ID", width: 50 },
            { field: "titulo", headerName: "Título", flex: 1 },
            { field: "descriacao_oc", headerName: "Descrição", flex: 1 },
            { field: "id_eqp", headerName: "Equipamento", flex: 1, renderCell: ({ row }) => {
                const equipamento = equipamentos.find((eqp) => eqp.id_eqp === row.id_eqp);
                return equipamento ? equipamento.nome_eqp : "Equipamento não encontrado";
            } },
            {
                field: "status",
                headerName: "Status",
                maxWidth: 120,
                flex: 1,
                renderCell: ({ row }) =>
                    row.status ? (
                        <Chip icon={<CheckIcon />} label="Finalizado" color="success" size="small" onClick={() => toggleStatus(row.id_oc)} />
                    ) : (
                        <Chip icon={<CloseIcon />} label="Pendente" color="warning" size="small" onClick={() => toggleStatus(row.id_oc)} />
                    ),
            },
            {
                field: "options",
                headerName: "Opções",
                maxWidth: 180,
                flex: 1,
                renderCell: ({ row }) => (
                    <>
                        <IconButton
                            size="small"
                        >
                            <VisibilityIcon />
                        </IconButton>
                        {userType === "adm" && !row.status && (
                            <Tooltip title="Dar baixa">
                                <IconButton
                                    size="small"
                                >
                                    <FileDownloadIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                    </>
                ),
            },
        ],
        [toggleStatus, userType]
    );

    const getRowId: GridRowIdGetter<Ocorrencias> = useCallback((row) => row.id_oc, []);

    const CustomPageToolbarComponent = useCallback(() => (<PageHeaderToolbar>
        <Button variant="contained" onClick={() => setEditId(null)}>Cadastrar</Button>
    </PageHeaderToolbar>), [])

    const PageHeaderCustom = useCallback(() => <PageHeader slots={{ toolbar: CustomPageToolbarComponent }} />, [CustomPageToolbarComponent])

    return (
        <PageContainer slots={{ header: PageHeaderCustom }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10, 20]}
                showToolbar
            />
            {editId !== undefined && <EditarEquipamento id={editId} handleClose={() => setEditId(undefined)} />}
        </PageContainer>
    );
}
