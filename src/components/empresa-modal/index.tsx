import { empresaAtom, usuarioAdministradorAtom } from "@/state/atoms";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useAtom, useAtomValue } from "jotai";
import React, { useState } from "react";
import { maskBr } from "js-brasil";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UsuariosAdminTabela from "./usuarios-adm";

const EmpresaModal = ({ id, handleClose }: { id: number; handleClose: () => void }) => {
    const empresas = useAtomValue(empresaAtom);
    const empresa = empresas.find((empresa) => empresa.id_empre === id)!;

    const [value, setValue] = useState("user-admin");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Dialog open onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">
                Empresa: {empresa.nome_empre} ({maskBr.cnpj(empresa.cnpj)})
            </DialogTitle>
            <DialogContent>
              <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList onChange={handleChange}>
                          <Tab label="Usuários Administrativos" value="user-admin" />
                          <Tab label="Usuários Gerais" value="user-geral" />
                      </TabList>
                  </Box>
                  <TabPanel value="user-admin"><UsuariosAdminTabela id={id} /></TabPanel>
                  <TabPanel value="user-geral">Usuários Gerais</TabPanel>
              </TabContext>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmpresaModal;
