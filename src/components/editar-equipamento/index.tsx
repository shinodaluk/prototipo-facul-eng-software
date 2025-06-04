import { equipamentoAtom as atom } from "@/state/atoms";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Drawer from "@mui/material/Drawer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useAtomValue } from "jotai";
import React from "react";

const EditarEquipamento = ({ id, handleClose }: { id: number | null; handleClose: () => void }) => {
    const row = useAtomValue(atom);
    const { nome_eqp, descricao, status } = row.find((emp) => emp.id_eqp === id) ?? { nome_eqp: "", descricao: "", status: true };

    return (
        <Drawer open onClose={handleClose} anchor="right" sx={{zIndex: 1300}}>
            <Paper sx={{ p: 4, minWidth: 400, maxWidth: 600, height: '100vh', overflowY: 'auto' }}>
                <Typography variant="h4" className="mb-4">{id === null ? 'Novo' : 'Editar'} Equipamento / Insumo</Typography>
                <div className="mb-2">
                    <TextField label="Nome" variant="outlined" value={nome_eqp} fullWidth />
                </div>
                <div className="mb-2">
                    <TextField label="Descrição" variant="outlined" value={descricao} fullWidth multiline/>
                </div>
                <div className="mb-2">
                    <FormControlLabel control={<Checkbox checked={status} />} label="Habilitado?" />
                </div>
                <Grid container justifyContent="space-around" alignItems="center">
                    <Button color="warning" variant="contained" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button color="success" variant="contained" onClick={handleClose}>
                        {id === null ? 'Cadastrar' : 'Salvar'}
                    </Button>
                </Grid>
            </Paper>
        </Drawer>
    );
};

export default EditarEquipamento;
