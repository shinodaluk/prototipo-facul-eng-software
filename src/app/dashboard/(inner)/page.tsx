"use client"

import { useRouter } from "next/navigation";
import Typography from '@mui/material/Typography';
import { PageContainer } from "@toolpad/core/PageContainer";

export default function Home() {
  const router = useRouter()
  
  return (
    <PageContainer><Typography>Welcome to the orders page!</Typography></PageContainer>
  );
}
