import React, { useCallback, useMemo } from "react";
import { useAtomValue } from "jotai";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { emprestimoAtom, equipamentoAtom, equipEmprestimoAtom } from "@/state/atoms";
import { EquipEmprestimo } from "@/app/Types";

const VerEmprestimo = ({ id, handleClose, darBaixa }: { id: number; handleClose: () => void; darBaixa?: () => void }) => {
    const emprestimos = useAtomValue(emprestimoAtom);
    const emprestimo = emprestimos.find((emp) => emp.id_emp === id)!;

    const equipamentosGeral = useAtomValue(equipamentoAtom);

    const equipEmprestimoGeral = useAtomValue(equipEmprestimoAtom).filter((equip) => equip.id_emp == id);

    const columns: GridColDef<EquipEmprestimo>[] = useMemo(
        () => [
            {
                field: "nome_eqp",
                headerName: "Nome",
                flex: 1,
                renderCell: ({ row }) => equipamentosGeral.find((eqp) => eqp.id_eqp === row.id_eqp)?.nome_eqp ?? "Equipamento não encontrado",
            },
        ],
        []
    );

    const getRowId: GridRowIdGetter<EquipEmprestimo> = useCallback((row) => row.id_eqp, []);

    return (
        <Dialog
            open
            onClose={handleClose}
            classes={{
                paper: "w-[80%] min-w-[80%] h-[80%] min-h-[80%]",
            }}
        >
            <DialogTitle id="alert-dialog-title">Empréstimo: #{emprestimo.id_empre}</DialogTitle>
            <DialogContent>
                <DataGrid
                    rows={equipEmprestimoGeral}
                    columns={columns}
                    getRowId={getRowId}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10, 20]}
                    showToolbar
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Fechar</Button>
                {
                    !emprestimo.status && darBaixa && <Button onClick={darBaixa} variant="contained" color="success">Dar Baixa</Button>
                }
                
            </DialogActions>
        </Dialog>
    );
};

export default VerEmprestimo;
