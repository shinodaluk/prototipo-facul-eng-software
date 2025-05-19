"use client"

import { useRouter } from "next/navigation";
import Button from '@mui/material/Button'

export default function Home() {
  const router = useRouter()
  
  return (
    <div className="flex gap-2">
      <Button variant="contained" fullWidth onClick={() => router.push('/login')}>Entrar</Button>
      <Button variant="contained" fullWidth color="warning" onClick={() => router.push('/recuperar-conta')}>Esqueci minha senha</Button>
    </div>
  );
}
