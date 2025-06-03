import { empresaAtom } from "@/state/atoms";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { maskBr } from "js-brasil";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UsuariosAdminTabela from "./usuarios-adm";
import UsuariosGeralTabela from "./usuarios-geral";
import EmprestimosTabela from "./emprestimos";
import EquipamentosTabela from "./equipamentos";
import OcorrenciasTabela from "./ocorrencias";
import RelatoriosTabela from "./relatorios";
import SolicitacoesTabela from "./solicitacoes";
import DocumentacaoTabela from "./documentacao";

const EmpresaModal = ({ id, handleClose }: { id: number; handleClose: () => void }) => {
    const empresas = useAtomValue(empresaAtom);
    const empresa = empresas.find((empresa) => empresa.id_empre === id)!;

    const [value, setValue] = useState("user-admin");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Dialog
            open
            onClose={handleClose}
            classes={{
                paper: "w-[80%] min-w-[80%] h-[80%] min-h-[80%]",
            }}
        >
            <DialogTitle id="alert-dialog-title">
                Empresa: {empresa.nome_empre} ({maskBr.cnpj(empresa.cnpj)})
            </DialogTitle>
            <DialogContent>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
                            <Tab label="Administradores" value="user-admin" />
                            <Tab label="Usuários" value="user-geral" />
                            <Tab label="Empréstimos" value="emprestimos" />
                            <Tab label="Equipamentos" value="equipamentos" />
                            <Tab label="Ocorrências" value="ocorrencias" />
                            <Tab label="Relatórios" value="relatorios" />
                            <Tab label="Solicitações" value="solicitacoes" />
                            <Tab label="Documentações" value="documentacao" />
                        </TabList>
                    </Box>
                    <TabPanel value="user-admin">
                        <UsuariosAdminTabela id={id} />
                    </TabPanel>
                    <TabPanel value="user-geral">
                        <UsuariosGeralTabela id={id} />
                    </TabPanel>
                    <TabPanel value="emprestimos">
                        <EmprestimosTabela id={id} />
                    </TabPanel>
                    <TabPanel value="equipamentos">
                        <EquipamentosTabela id={id} />
                    </TabPanel>
                    <TabPanel value="ocorrencias">
                        <OcorrenciasTabela id={id} />
                    </TabPanel>
                    <TabPanel value="relatorios">
                        <RelatoriosTabela id={id} />
                    </TabPanel>
                    <TabPanel value="solicitacoes">
                        <SolicitacoesTabela id={id} />
                    </TabPanel>
                    <TabPanel value="documentacao">
                        <DocumentacaoTabela id={id} />
                    </TabPanel>
                </TabContext>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmpresaModal;
