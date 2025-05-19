import React from "react";
import "./layout.css";

const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="flex items-center justify-center h-screen">
    <div className="max-w-1/4 w-full flex flex-col">
      <div className="py-8 flex-none">
        <a href="/"><h1 className="text-3xl font-bold text-center">Equipa+</h1></a>
      </div>
      <div className="rounded-lg shadow-lg bg-white p-12 flex-auto">
        {children}
      </div>
    </div>
  </div>;
};

export default LoginLayout;
