"use client"

import Typography from '@mui/material/Typography';
import { PageContainer } from "@toolpad/core/PageContainer";
import { userTypeAtom } from "@/state/atoms";
import { useAtomValue } from "jotai";
import Grid from "@mui/material/Grid";
import EmprestimosVencidos from "@/components/dashobard-vencidos";
import EmprestimosAVencer from "@/components/dashobard-a-vencer";
import EmprestimosTodos from '@/components/dashobard-todos';
import DashboardQrcode from '@/components/dashboard-qrcode';

export default function Home() {
  const userType = useAtomValue(userTypeAtom);
  
  return (
    <PageContainer>
      <Typography variant="h4">Bem vindo ao sistema Equipa+!</Typography>
      {userType === "adm" && (
        <Grid container gap={4} flexDirection="column" flex={1} wrap="nowrap" flexBasis={"100%"}>
          <Grid container gap={2} flexDirection="row" wrap="nowrap" height={"50%"}>
              <EmprestimosVencidos />
              <EmprestimosAVencer />
          </Grid>
          <Grid container gap={2} flexDirection="row" wrap="nowrap" height={"50%"}>
            <EmprestimosTodos />
            <DashboardQrcode />
          </Grid>
        </Grid>
      )}
      {userType === "geral" && (
        <Grid container gap={4} flexDirection="row" flex={1} wrap="nowrap" flexBasis={"100%"}>
          <EmprestimosTodos />
          <EmprestimosAVencer />
        </Grid>
      )}
    </PageContainer>
  );
}
