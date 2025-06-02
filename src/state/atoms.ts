import {
    Documentacao,
    Empresa,
    Emprestimo,
    Equipamentos,
    EquipEmprestimo,
    OcorrenciaEmprestimo,
    Ocorrencias,
    Relatorios,
    Solicitacoes,
    Tem,
    UsuarioAdministrador,
    UsuarioDesenvolvedor,
    UsuarioGeral,
} from "@/app/Types";
import { atomWithStorage, splitAtom } from "jotai/utils";

export const errorAllAtom = atomWithStorage("errorAllAtom", false);
errorAllAtom.debugLabel = "errorAllAtom";

export type UserTypes = "dev" | "adm" | "geral";
export const userTypeAtom = atomWithStorage<UserTypes>("userTypeAtom", "geral");
userTypeAtom.debugLabel = "userTypeAtom";

export const isGeneratingAtom = atomWithStorage("isGeneratingAtom", false);
isGeneratingAtom.debugLabel = "isGeneratingAtom";

export const usuarioDesenvolvedorAtom = atomWithStorage<UsuarioDesenvolvedor[]>("usuarioDesenvolvedorAtom", []);
usuarioDesenvolvedorAtom.debugLabel = "usuarioDesenvolvedorAtom";

export const empresaAtom = atomWithStorage<Empresa[]>("empresaAtom", []);
empresaAtom.debugLabel = "empresaAtom";

export const empresasAtom = splitAtom(empresaAtom)
empresasAtom.debugLabel = "empresasAtom";

export const usuarioAdministradorAtom = atomWithStorage<UsuarioAdministrador[]>("usuarioAdministradorAtom", []);
usuarioAdministradorAtom.debugLabel = "usuarioAdministradorAtom";

export const equipamentoAtom = atomWithStorage<Equipamentos[]>("equipamentoAtom", []);
equipamentoAtom.debugLabel = "equipamentoAtom";

export const ocorrenciaAtom = atomWithStorage<Ocorrencias[]>("ocorrenciaAtom", []);
ocorrenciaAtom.debugLabel = "ocorrenciaAtom";

export const relatorioAtom = atomWithStorage<Relatorios[]>("relatorioAtom", []);
relatorioAtom.debugLabel = "relatorioAtom";

export const solicitacaoAtom = atomWithStorage<Solicitacoes[]>("solicitacaoAtom", []);
solicitacaoAtom.debugLabel = "solicitacaoAtom";

export const usuarioGeralAtom = atomWithStorage<UsuarioGeral[]>("usuarioGeralAtom", []);
usuarioGeralAtom.debugLabel = "usuarioGeralAtom";

export const emprestimoAtom = atomWithStorage<Emprestimo[]>("emprestimoAtom", []);
emprestimoAtom.debugLabel = "emprestimoAtom";

export const documentacaoAtom = atomWithStorage<Documentacao[]>("documentacaoAtom", []);
documentacaoAtom.debugLabel = "documentacaoAtom";

export const usuarioGeralEmprestimoAtom = atomWithStorage<Tem[]>("usuarioGeralEmprestimoAtom", []);
usuarioGeralEmprestimoAtom.debugLabel = "usuarioGeralEmprestimoAtom";

export const ocorrenciaEmprestimoAtom = atomWithStorage<OcorrenciaEmprestimo[]>("ocorrenciaEmprestimoAtom", []);
ocorrenciaEmprestimoAtom.debugLabel = "ocorrenciaEmprestimoAtom";

export const equipEmprestimoAtom = atomWithStorage<EquipEmprestimo[]>("equipEmprestimoAtom", []);
equipEmprestimoAtom.debugLabel = "equipEmprestimoAtom";
