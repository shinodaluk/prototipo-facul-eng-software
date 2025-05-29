"use client";

import React, { useActionState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import delay from "lodash/delay";
import Alert from "@mui/material/Alert";
import { useNotifications } from "@toolpad/core/useNotifications";
import { FormState } from "@/app/Types";
import { useAtomValue } from "jotai";
import { errorAllAtom } from "@/state/atoms";

const NovaSenha = () => {
    const notifications = useNotifications();
    const router = useRouter();
    const errorAll = useAtomValue(errorAllAtom);

    const [state, submitAction, isPending] = useActionState<FormState | null, FormData>(async (_, formData) => {
        if (!formData.get("password")) {
            return { success: false, fieldsErrors: { password: "Senha requerida" } };
        }

        if (!formData.get("password-confirm")) {
            return { success: false, fieldsErrors: { "password-confirm": "Cofirmação de senha requerido" } };
        }

        if (formData.get("password") !== formData.get("password-confirm")) {
            return { success: false, fieldsErrors: { "password-confirm": "Cofirmação de senha difere" } };
        }

        const loader = new Promise<FormState>((resolve) => {
            delay(async () => {
                errorAll
                    ? resolve({
                          success: false,
                          error: "Error no servidor",
                      })
                    : resolve({
                          success: true,
                      });
            }, 2000);
        });

        const state = await loader;

        if (state?.success) {
            notifications.show("Senha alterada com sucesso", {
                severity: "success",
                autoHideDuration: 3000,
            });

            router.push("/login");
        }

        return state;
    }, null);

    return (
        <form className="flex flex-col" action={submitAction}>
            <div className="text-center">
                <h5 className="font-semibold mb-2 text-center text-xl">Registrar nova senha</h5>
            </div>
            {state?.success === false && !!state?.error && (
                <div className="mb-4">
                    <Alert severity="error">{state?.error}</Alert>
                </div>
            )}
            <div className="mb-4">
                <p className="text-sm mb-2 font-semibold text-[#333335]">Senha</p>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder="senha"
                    type="password"
                    name="password"
                    error={!!state?.fieldsErrors?.password}
                    helperText={state?.fieldsErrors?.password}
                    disabled={isPending}
                />
            </div>
            <div className="mb-4">
                <p className="text-sm mb-2 font-semibold text-[#333335]">Confirme sua Senha</p>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder="confirme sua senha"
                    type="password"
                    name="password-confirm"
                    error={!!state?.fieldsErrors?.["password-confirm"]}
                    helperText={state?.fieldsErrors?.["password-confirm"]}
                    disabled={isPending}
                />
            </div>
            <div>
                <Button variant="contained" fullWidth type="submit" loading={isPending} loadingPosition="start">
                    Salvar
                </Button>
            </div>
        </form>
    );
};

export default NovaSenha;
