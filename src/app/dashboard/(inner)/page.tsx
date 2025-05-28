"use client"

import { useRouter } from "next/navigation";
import Typography from '@mui/material/Typography';

export default function Home() {
  const router = useRouter()
  
  return (
    <Typography>Welcome to the orders page!</Typography>
  );
}
