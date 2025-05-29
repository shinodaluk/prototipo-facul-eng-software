"use client";

import React, { useActionState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import delay from "lodash/delay";
import Alert from "@mui/material/Alert";
import { useNotifications } from "@toolpad/core/useNotifications";
import { FormState } from "@/app/Types";
import { useAtomValue } from "jotai";
import { errorAllAtom } from "@/state/atoms";

const Login = () => {
    const notifications = useNotifications();
    const router = useRouter();
    const errorAll = useAtomValue(errorAllAtom);

    const [state, submitAction, isPending] = useActionState<FormState | null, FormData>(async (_, formData) => {
        if (!formData.get("email")) {
            return { success: false, fieldsErrors: { email: "E-mail requerido" } };
        }
        
        if (!formData.get("password")) {
            return { success: false, fieldsErrors: { password: "Senha requerido" } };
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
            notifications.show("Login realizado com sucesso", {
                severity: "success",
                autoHideDuration: 3000,
            });

            router.push("/dashboard");
        }

        return state;
    }, null);

    return (
        <form className="flex flex-col" action={submitAction}>
            <div className="text-center">
                <h5 className="font-semibold mb-2 text-center text-xl">Entrar</h5>
                <p className="mb-6 text-muted opacity-70 font-normal text-center">Bem vindo!</p>
            </div>
            {state?.success === false && !!state?.error && (
                <div className="mb-4">
                    <Alert severity="error">{state?.error}</Alert>
                </div>
            )}
            <div className="mb-4">
                <p className="text-sm mb-2 font-semibold text-[#333335]">E-mail</p>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder="e-mail"
                    type="email"
                    name="email"
                    error={!!state?.fieldsErrors?.email}
                    helperText={state?.fieldsErrors?.email}
                    disabled={isPending}
                />
            </div>
            <div className="mb-4">
                <p className="text-sm mb-2 font-semibold text-[#333335]">
                    Senha
                    <a href="/recuperar-conta" className="float-end text-red-400">
                        Esqueceu a senha?
                    </a>
                </p>
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
                <FormControlLabel
                    control={<Checkbox size="small" name="remember" disabled={isPending} />}
                    label="Lembrar da senha?"
                    slotProps={{
                        typography: {
                            className: "text-gray-500 text-sm font-normal",
                        },
                    }}
                />
            </div>
            <div>
                <Button variant="contained" fullWidth type="submit" loading={isPending} loadingPosition="start">
                    Entrar
                </Button>
            </div>
        </form>
    );
};

export default Login;
