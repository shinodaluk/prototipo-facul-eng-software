"use client";

import React from "react";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ThemeProvider } from "@mui/material/styles";
import { useAtom } from "jotai";
import { errorAllAtom } from "@/state/atoms";
import theme from "../../theme";
import { DevTools } from "jotai-devtools";
import "./layout.css";
import "jotai-devtools/styles.css";
import logo from '@/../public/equipaplus.svg';
import Image from "next/image";

const LoginLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [errorAll, setErrorAll] = useAtom(errorAllAtom);

    return (
        <>
            <ThemeProvider theme={theme}>
                <NotificationsProvider
                    slotProps={{
                        snackbar: {
                            anchorOrigin: { vertical: "bottom", horizontal: "right" },
                        },
                    }}
                >
                    <div className="absolute top-2 right-2">
                        <FormControlLabel
                            control={<Checkbox size="small" name="remember" checked={errorAll} onChange={() => setErrorAll(!errorAll)} />}
                            label="Falhar"
                            slotProps={{
                                typography: {
                                    className: "text-gray-500 text-sm font-normal",
                                },
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-center h-screen">
                        <div className="max-w-1/4 w-full flex flex-col">
                            <div className="flex-none text-center">
                                <a href="/">
                                    <Image src={logo} alt="Logo Equipa+" className="text-center mx-auto"/>
                                </a>
                            </div>
                            <div className="rounded-lg shadow-lg bg-white p-12 flex-auto">{children}</div>
                        </div>
                    </div>
                </NotificationsProvider>
            </ThemeProvider>
            <DevTools />
        </>
    );
};

export default LoginLayout;
