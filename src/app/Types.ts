export type FormState = { success: boolean; error?: string; fieldsErrors?: { [key: string]: string } };

export type Empresa = {
    id_empre: number;
    nome_empre: string;
    cnpj: string;
    status: boolean;
};

export type UsuarioDesenvolvedor = {
    id_dev: number;
    nome_dev: string;
    email: string;
    senha: string;
    status: boolean;
};

export type UsuarioAdministrador = {
    id_adm: number;
    nome_adm: string;
    login: string;
    senha: string;
    status: boolean;
    id_empre: number;
};

export type Equipamentos = {
    id_eqp: number;
    nome_eqp: string;
    status: boolean;
    descricao: string;
    id_empre: number;
};

export type Ocorrencias = {
    id_oc: number;
    titulo: string;
    descriacao_oc: string;
    status: boolean;
    id_eqp: number;
};

export type Relatorios = {
    id_rel: number;
    titulo: string;
    conteudo: string;
    data_geracao: Date;
    id_empre: number;
};

export type Solicitacoes = {
    id_sol: number;
    titulo: string;
    descricao: string;
    status: boolean;
    data_sol: Date;
    resposta: string;
    data_finalizacao: Date | null;
    id_empre: number;
};

export type UsuarioGeral = {
    id_usug: number;
    email: string;
    status: boolean;
    senha: string;
    nome: string;
    id_empre: number;
};

export type Emprestimo = {
    id_emp: number;
    data_emp: Date;
    data_dev: Date;
    status: boolean;
    id_empre: number;
    id_adm: number;
};

export type Documentacao = {
    id_doc: number;
    link: string;
    status: boolean;
    titulo: string;
    id_empre: number;
    id_eqp: number;
};

export type Tem = {
    id_usug: number;
    id_emp: number;
};

export type OcorrenciaEmprestimo = {
    id_emp: number;
    id_oc: number;
};

export type EquipEmprestimo = {
    id_eqp: number;
    id_emp: number;
};
