"use client";

import { useCallback, useMemo, useState } from "react";
import { DataGrid, GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useAtom, useAtomValue } from "jotai";
import { PageContainer, PageHeader, PageHeaderToolbar } from "@toolpad/core/PageContainer";
import IconButton from "@mui/material/IconButton";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Emprestimo } from "@/app/Types";
import { empresaIdAtom, emprestimoAtom, equipEmprestimoAtom, userTypeAtom, usuarioGeralAtom, usuarioGeralEmprestimoAtom, usuarioIdAtom } from "@/state/atoms";
import { isAfter } from "date-fns";
import Tooltip from "@mui/material/Tooltip";
import VerEmprestimo from "@/components/ver-emprestimo";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import Button from "@mui/material/Button";

export default function Page() {
    const empresa = useAtomValue(empresaIdAtom);
    const [emprestimoGeral, setEmprestimoGeral] = useAtom(emprestimoAtom);
    const usuariosEmprestimosGeral = useAtomValue(usuarioGeralEmprestimoAtom);
    const equipEmprestimoGeral = useAtomValue(equipEmprestimoAtom);
    const usuariosGeral = useAtomValue(usuarioGeralAtom);
    const usuariosGeralEmpresa = usuariosGeral.filter((usuario) => usuario.id_empre === empresa);
    const [viewId, setViewId] = useState<number | undefined>(undefined);
    
    const userType = useAtomValue(userTypeAtom);
    const user = useAtomValue(usuarioIdAtom);

    const darBaixa = useCallback(
        (id: number) => {
            setEmprestimoGeral(emprestimoGeral.map((emp) => (emp.id_emp === id ? { ...emp, status: true } : emp)));
        },
        [emprestimoGeral]
    );

    const rows = useMemo(() => {
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

    const columns: GridColDef<Emprestimo>[] = useMemo(
        () => {
            let fields: GridColDef<Emprestimo>[] = [
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
                    renderCell: ({ row }) => equipEmprestimoGeral.filter((equip) => equip.id_emp === row.id_emp).length,
                },
                {
                    field: "status",
                    headerName: "Status",
                    maxWidth: 150,
                    flex: 1,
                    renderCell: ({ row }) => {
                        if (isAfter(new Date(), row.data_dev) && !row.status) {
                            return <Chip icon={<CloseIcon />} label="Atrasado" color="error" size="small" />;
                        }
    
                        return row.status ? (
                            <Chip icon={<CheckIcon />} label="Devolvido" color="success" size="small" />
                        ) : (
                            <Chip icon={<CloseIcon />} label="Emprestado" color="warning" size="small" />
                        );
                    },
                },
            ];

            if(userType === "adm") {
                fields = [
                    ...fields,
                    {
                        field: "users",
                        headerName: "Usuário Solicitante",
                        flex: 1,
                        renderCell: ({ row }) => {
                            const usuariosEmprestimoIds = usuariosEmprestimosGeral
                                .filter((usu_emp) => usu_emp.id_emp === row.id_emp)
                                .map((usu_emp) => usuariosGeralEmpresa.find((usu) => usu.id_usug === usu_emp.id_usug)?.nome);
        
                            return (
                                <>
                                    {usuariosEmprestimoIds.map((nome) => (
                                        <Chip label={nome} key={nome} />
                                    ))}
                                </>
                            );
                        },
                    },
                    {
                        field: "options",
                        headerName: "Opções",
                        maxWidth: 150,
                        flex: 1,
                        renderCell: ({ row }) => (
                            <>
                                <Tooltip title="Ver detalhes">
                                    <IconButton
                                        size="small"
                                        onClick={() => {
                                            setViewId(row.id_emp);
                                        }}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </Tooltip>
                                {!row.status && (
                                    <Tooltip title="Dar baixa">
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                darBaixa(row.id_emp);
                                            }}
                                        >
                                            <FileDownloadIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                <PopupState variant="popover" popupId="demoMenu">
                                    {(popupState) => (
                                        <>
                                            <IconButton {...bindTrigger(popupState)}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu {...bindMenu(popupState)}>
                                                <MenuItem onClick={popupState.close}>Rastreio</MenuItem>
                                                <MenuItem onClick={popupState.close}>Solicitações</MenuItem>
                                                <MenuItem onClick={popupState.close}>Ocorrências</MenuItem>
                                            </Menu>
                                        </>
                                    )}
                                </PopupState>
                            </>
                        ),
                    },
                ]
            }

            if(userType === "geral") {
                fields = [
                    ...fields,
                    {
                        field: "options",
                        headerName: "Opções",
                        maxWidth: 180,
                        flex: 1,
                        renderCell: ({ row }) => (
                            <Tooltip title="Ver detalhes">
                                <IconButton
                                    size="small"
                                        onClick={() => {
                                            setViewId(row.id_emp);
                                        }}
                                >
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                        ),
                    },
                ]
            }

            return fields;
        },
        [usuariosGeralEmpresa, equipEmprestimoGeral, userType, user]
    );

    const getRowId: GridRowIdGetter<Emprestimo> = useCallback((row) => row.id_emp, []);

    const CustomPageToolbarComponent = useCallback(() => (<PageHeaderToolbar>
        <Button variant="contained">Solicitar</Button>
    </PageHeaderToolbar>), [])

    const PageHeaderCustom = useCallback(() => <PageHeader slots={{ toolbar: CustomPageToolbarComponent }} />, [CustomPageToolbarComponent])

    return (
        <PageContainer slots={userType === "geral" ? { header: PageHeaderCustom } : undefined}>
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
            {viewId !== undefined && (
                <VerEmprestimo
                    id={viewId}
                    handleClose={() => setViewId(undefined)}
                />
            )}
        </PageContainer>
    );
}
