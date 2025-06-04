"use client";

import { DataGrid, GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import Chip from "@mui/material/Chip";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useAtom, useAtomValue } from "jotai";
import { empresaIdAtom, equipamentoAtom, userTypeAtom } from "@/state/atoms";
import { Equipamentos } from "@/app/Types";
import { PageContainer, PageHeader, PageHeaderToolbar } from "@toolpad/core/PageContainer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EditarEquipamento from "@/components/editar-equipamento";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import Tooltip from "@mui/material/Tooltip";

export default function Page() {
    const empresa = useAtomValue(empresaIdAtom);
    const [equipamentoGeral, setEquipamentoGeral] = useAtom(equipamentoAtom);
    const [editId, setEditId] = useState<number | null | undefined>(undefined);
    const userType = useAtomValue(userTypeAtom);

    const toggleStatus = useCallback(
        (id: number) => {
            setEquipamentoGeral(equipamentoGeral.map((equip) => (equip.id_eqp === id ? { ...equip, status: !equip.status } : equip)));
        },
        [equipamentoGeral]
    );

    const columns: GridColDef<Equipamentos>[] = useMemo(
        () => {
            let fields: GridColDef<Equipamentos>[] = [
                { field: "id_eqp", headerName: "ID", width: 50 },
                { field: "nome_eqp", headerName: "Nome", flex: 1 },
                { field: "descricao", headerName: "Descrição", flex: 1 },
                {
                    field: "status",
                    headerName: "Status",
                    maxWidth: 120,
                    flex: 1,
                    renderCell: ({ row }) =>
                        row.status ? (
                            <Chip icon={<CheckIcon />} label="Habilitado" color="success" size="small" onClick={userType === "adm" ? () => toggleStatus(row.id_eqp) : undefined} />
                        ) : (
                            <Chip icon={<CloseIcon />} label="Desabilitado" color="error" size="small" onClick={userType === "adm" ? () => toggleStatus(row.id_eqp) : undefined} />
                        ),
                },
            ]

            if(userType === "adm") {
                fields = [
                    ...fields,
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
                                <IconButton
                                    size="small"
                                    onClick={() => {
                                        setEditId(row.id_eqp);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton size="small" color="error">
                                    <DeleteIcon />
                                </IconButton>
                                <PopupState variant="popover" popupId="demoMenu">
                                    {(popupState) => (
                                        <>
                                            <IconButton {...bindTrigger(popupState)}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu {...bindMenu(popupState)}>
                                                <MenuItem onClick={popupState.close}>Documentação</MenuItem>
                                                <MenuItem onClick={popupState.close}>Rastreio</MenuItem>
                                                <MenuItem onClick={popupState.close}>Relatórios</MenuItem>
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
                            <>
                                <Tooltip title="Ver produto">
                                    <IconButton
                                        size="small"
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Ver empréstimos">
                                    <IconButton
                                        size="small"
                                    >
                                        <WorkHistoryIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        ),
                    },
                ]
            }
            
            return fields
        },
        [toggleStatus, userType]
    );

    const getRowId: GridRowIdGetter<Equipamentos> = useCallback((row) => row.id_eqp, []);

    const CustomPageToolbarComponent = useCallback(() => (<PageHeaderToolbar>
        <Button variant="contained" onClick={() => setEditId(null)}>Cadastrar</Button>
    </PageHeaderToolbar>), [])

    const PageHeaderCustom = useCallback(() => <PageHeader slots={{ toolbar: CustomPageToolbarComponent }} />, [CustomPageToolbarComponent])

    return (
        <PageContainer slots={userType === "adm" ? { header: PageHeaderCustom } : undefined}>
            <DataGrid
                rows={equipamentoGeral.filter((equip) => equip.id_empre === empresa)}
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
