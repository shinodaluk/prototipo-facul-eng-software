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
import {
    documentacaoAtom,
    empresaAtom,
    emprestimoAtom,
    equipamentoAtom,
    equipEmprestimoAtom,
    isGeneratingAtom,
    ocorrenciaAtom,
    ocorrenciaEmprestimoAtom,
    relatorioAtom,
    solicitacaoAtom,
    usuarioAdministradorAtom,
    usuarioDesenvolvedorAtom,
    usuarioGeralAtom,
    usuarioGeralEmprestimoAtom,
} from "@/state/atoms";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { getDefaultStore } from "jotai";
import { gerarCNPJ } from "./cnpj";
import random from "lodash/random";

const defaultStore = getDefaultStore();
const setIsGenerating = (value: boolean) => defaultStore.set(isGeneratingAtom, value);

export const GenerateData = async () => {
    setIsGenerating(true);

    await new Promise<void>((resolve) => {
        const userDevEmailArray = faker.helpers.uniqueArray(faker.internet.email, 10);

        const userDevs: UsuarioDesenvolvedor[] = [];
        for (let userDevEmail in userDevEmailArray) {
            userDevs.push({
                id_dev: userDevEmailArray.indexOf(userDevEmail) + 1,
                nome_dev: faker.person.fullName(),
                email: userDevEmail,
                senha: faker.internet.password(),
                status: true,
            });
        }

        defaultStore.set(usuarioDesenvolvedorAtom, userDevs);

        const empresasArray = faker.helpers.uniqueArray(faker.company.name, 20);

        const empresas: Empresa[] = [];
        const userAdms: UsuarioAdministrador[] = [];
        const equipamentos: Equipamentos[] = [];
        const ocorrencias: Ocorrencias[] = [];
        const relatorios: Relatorios[] = [];
        const solicitacoes: Solicitacoes[] = [];
        const userGeral: UsuarioGeral[] = [];
        const emprestimos: Emprestimo[] = [];
        const documentacoes: Documentacao[] = [];
        const userTemEmp: Tem[] = [];
        const ocorrenciaEmprestimoEmp: OcorrenciaEmprestimo[] = [];
        const equipEmprestimoEmp: EquipEmprestimo[] = [];

        for (const empresaNome of empresasArray) {
            const empresaId = empresasArray.indexOf(empresaNome) + 1;
            empresas.push({
                id_empre: empresaId,
                nome_empre: empresaNome,
                cnpj: gerarCNPJ(),
                status: true,
            });

            const userAdmEmailArray = faker.helpers.uniqueArray(faker.internet.email, 10);
            const userAdmBuffer: UsuarioAdministrador[] = [];

            for (const userAdmEmail of userAdmEmailArray) {
                const user = {
                    id_adm: userAdmEmailArray.indexOf(userAdmEmail) + 1,
                    nome_adm: faker.person.fullName(),
                    login: userAdmEmail,
                    senha: faker.internet.password(),
                    status: true,
                    id_empre: empresaId,
                };
                userAdms.push(user);
                userAdmBuffer.push(user);
            }

            const equipamentosArray = faker.helpers.uniqueArray(faker.commerce.product, faker.number.int({ min: 5, max: 100 }));
            const ocorrenciasArray = faker.helpers.uniqueArray(faker.lorem.paragraph, faker.number.int({ min: 5, max: 20 }));
            const equipamentoBuffer: Equipamentos[] = [];
            const ocorrenciasBuffer: Ocorrencias[] = [];

            for (const equipamentoNome of equipamentosArray) {
                const equipamentoId = equipamentosArray.indexOf(equipamentoNome) + 1;
                const equipamento = {
                    id_eqp: equipamentoId,
                    nome_eqp: equipamentoNome,
                    status: true,
                    descricao: faker.commerce.product(),
                    id_empre: empresaId,
                };
                equipamentos.push(equipamento);
                equipamentoBuffer.push(equipamento);

                for (const ocorrenciaNome of ocorrenciasArray) {
                    const ocorrencia = {
                        id_oc: ocorrenciasArray.indexOf(ocorrenciaNome) + 1,
                        titulo: ocorrenciaNome,
                        descriacao_oc: faker.lorem.sentence(),
                        status: true,
                        id_eqp: equipamentoId,
                    };

                    ocorrencias.push(ocorrencia);
                    ocorrenciasBuffer.push(ocorrencia);
                }
            }

            const relatoriosArray = faker.helpers.uniqueArray(faker.lorem.paragraph, faker.number.int({ min: 5, max: 100 }));

            for (const relatorioNome of relatoriosArray) {
                relatorios.push({
                    id_rel: ocorrenciasArray.indexOf(relatorioNome) + 1,
                    titulo: relatorioNome,
                    conteudo: faker.lorem.sentence(),
                    data_geracao: faker.date.recent({ days: 100 }),
                    id_empre: empresaId,
                });
            }

            const solicitacoesArray = faker.helpers.uniqueArray(faker.lorem.paragraph, faker.number.int({ min: 5, max: 100 }));

            for (const solicitacaoNome of solicitacoesArray) {
                const solDate = faker.date.recent({ days: 100 });
                const isFinished = Boolean(random(1));

                solicitacoes.push({
                    id_sol: solicitacoesArray.indexOf(solicitacaoNome) + 1,
                    titulo: solicitacaoNome,
                    descricao: faker.lorem.sentence(),
                    status: true,
                    data_sol: solDate,
                    resposta: isFinished ? faker.lorem.paragraph() : "",
                    data_finalizacao: isFinished ? faker.date.recent({ days: 10, refDate: solDate }) : null,
                    id_empre: empresaId,
                });
            }

            const userGeralEmailArray = faker.helpers.uniqueArray(faker.internet.email, 10);
            const userGeralBuffer: UsuarioGeral[] = [];

            for (const userGeralEmail of userGeralEmailArray) {
                const user = {
                    id_usug: userGeralEmailArray.indexOf(userGeralEmail) + 1,
                    email: userGeralEmail,
                    senha: faker.internet.password(),
                    nome: faker.person.fullName(),
                    status: true,
                    id_empre: empresaId,
                };
                userGeral.push(user);
                userGeralBuffer.push(user);
            }

            const emprestimosArray = faker.helpers.uniqueArray(faker.internet.email, 10);

            for (const emprestimoNome of emprestimosArray) {
                const id = emprestimosArray.indexOf(emprestimoNome) + 1;
                const empDate = faker.date.recent({ days: 100 });
                const isFuture = Boolean(random(1));

                emprestimos.push({
                    id_emp: id,
                    data_emp: empDate,
                    data_dev: isFuture ? faker.date.soon({ days: 90 }) : faker.date.recent({ days: 10, refDate: empDate }),
                    status: true,
                    id_empre: empresaId,
                    id_adm: faker.helpers.arrayElement(userAdmBuffer).id_adm,
                });

                userTemEmp.push({
                    id_emp: id,
                    id_usug: faker.helpers.arrayElement(userGeralBuffer).id_usug,
                });

                ocorrenciaEmprestimoEmp.push({
                    id_emp: id,
                    id_oc: faker.helpers.arrayElement(ocorrenciasBuffer).id_oc,
                });

                const equips = faker.helpers.arrayElements(equipamentoBuffer);

                for (const equip of equips) {
                    equipEmprestimoEmp.push({
                        id_emp: id,
                        id_eqp: equip.id_eqp,
                    });
                }
            }

            const documentacaoArray = faker.helpers.uniqueArray(faker.lorem.paragraph, faker.number.int({ min: 5, max: 100 }));

            for (const documentacaoNome of documentacaoArray) {
                documentacoes.push({
                    id_doc: documentacaoArray.indexOf(documentacaoNome) + 1,
                    link: `${faker.internet.url({ appendSlash: true })}${faker.system.fileName()}`,
                    status: true,
                    titulo: documentacaoNome,
                    id_empre: empresaId,
                    id_eqp: faker.helpers.arrayElement(equipamentoBuffer).id_eqp,
                });
            }
        }

        defaultStore.set(empresaAtom, empresas);
        defaultStore.set(usuarioAdministradorAtom, userAdms);
        defaultStore.set(equipamentoAtom, equipamentos);
        defaultStore.set(ocorrenciaAtom, ocorrencias);
        defaultStore.set(relatorioAtom, relatorios);
        defaultStore.set(solicitacaoAtom, solicitacoes);
        defaultStore.set(usuarioGeralAtom, userGeral);
        defaultStore.set(emprestimoAtom, emprestimos);
        defaultStore.set(documentacaoAtom, documentacoes);
        defaultStore.set(usuarioGeralEmprestimoAtom, userTemEmp);
        defaultStore.set(ocorrenciaEmprestimoAtom, ocorrenciaEmprestimoEmp);
        defaultStore.set(equipEmprestimoAtom, equipEmprestimoEmp);

        resolve();
    });

    setIsGenerating(false);
};

export const resetData = async () => {
    setIsGenerating(true);

    await new Promise<void>((resolve) => {
        defaultStore.set(empresaAtom, []);
        defaultStore.set(usuarioAdministradorAtom, []);
        defaultStore.set(equipamentoAtom, []);
        defaultStore.set(ocorrenciaAtom, []);
        defaultStore.set(relatorioAtom, []);
        defaultStore.set(solicitacaoAtom, []);
        defaultStore.set(usuarioGeralAtom, []);
        defaultStore.set(emprestimoAtom, []);
        defaultStore.set(documentacaoAtom, []);
        defaultStore.set(usuarioGeralEmprestimoAtom, []);
        defaultStore.set(ocorrenciaEmprestimoAtom, []);
        defaultStore.set(equipEmprestimoAtom, []);

        resolve();
    });

    setIsGenerating(false);
};
