import React from "react";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import "./layout.css";

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto",
});

const LoginLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body className={`${roboto.variable} antialiased`}>
                <ThemeProvider theme={theme}>
                    <NotificationsProvider
                        slotProps={{
                            snackbar: {
                                anchorOrigin: { vertical: "bottom", horizontal: "right" },
                            },
                        }}
                    >
                        <div className="flex items-center justify-center h-screen">
                            <div className="max-w-1/4 w-full flex flex-col">
                                <div className="py-8 flex-none">
                                    <a href="/">
                                        <h1 className="text-3xl font-bold text-center">Equipa+</h1>
                                    </a>
                                </div>
                                <div className="rounded-lg shadow-lg bg-white p-12 flex-auto">{children}</div>
                            </div>
                        </div>
                    </NotificationsProvider>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default LoginLayout;
