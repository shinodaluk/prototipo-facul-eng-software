"use client";

import React, { useActionState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import delay from "lodash/delay";
import random from "lodash/random";
import Alert from "@mui/material/Alert";
import { useNotifications } from "@toolpad/core/useNotifications";
import { FormState } from "@/app/Types";
import { useAtomValue } from "jotai";
import { errorAllAtom } from "@/state/atoms";

const RecuperarConta = () => {
    const notifications = useNotifications();
    const router = useRouter();
    const errorAll = useAtomValue(errorAllAtom);

    const [state, submitAction, isPending] = useActionState<FormState | null, FormData>(async (_, formData) => {
        if (!formData.get("email")) {
            return { success: false, fieldsErrors: {email: "E-mail requerido"} };
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
            notifications.show("E-mail de recuperação enviado com sucesso", {
                severity: "success",
                autoHideDuration: 3000,
            });
        
            router.push("/nova-senha");
        }

        return state;
    }, null);

    return (
        <form className="flex flex-col" action={submitAction}>
            <div className="text-center">
                <h5 className="font-semibold mb-2 text-center text-xl">Recuperar Conta</h5>
            </div>
            {state?.success === false && !!state?.error && (
                <div className="mb-4">
                    <Alert severity="error">{state?.error}</Alert>
                </div>
            )}
            <div className="mb-4">
                <p className="text-sm mb-2 font-semibold text-[#333335]">E-mail</p>
                <TextField
                    error={!!state?.fieldsErrors?.email}
                    helperText={state?.fieldsErrors?.email}
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder="e-mail"
                    type="email"
                    name="email"
                    disabled={isPending}
                />
            </div>
            <div>
                <Button variant="contained" fullWidth type="submit" loading={isPending} loadingPosition="start">
                    Receber link de recuperação
                </Button>
            </div>
        </form>
    );
};

export default RecuperarConta;
