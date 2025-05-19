import React from 'react'
import "./login.css"
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'

const Login = () => {
  return (
    <form className="flex flex-col">
      <div className="text-center">
        <h5 className="font-semibold mb-2 text-center text-xl">Entrar</h5>
        <p className="mb-6 text-muted opacity-70 font-normal text-center">Bem vindo!</p>
      </div>
      <div className="mb-4">
        <p className="text-sm mb-2 font-semibold text-[#333335]">E-mail</p>
        <TextField variant="outlined" size="small" fullWidth placeholder="e-mail" type="email"/>
      </div>
      <div className="mb-4">
        <p className="text-sm mb-2 font-semibold text-[#333335]">Senha<a href="/recuperar-conta" className="float-end text-red-400">Esqueceu a senha?</a></p>
        <TextField variant="outlined" size="small" fullWidth placeholder="senha" type="password"/>
        <FormControlLabel required control={<Checkbox size="small"/>} label="Lembrar da senha?" slotProps={{
          typography: {
            className: "text-gray-500 text-sm font-normal"
          }
        }}/>
      </div>
      <div>
        <Button variant="contained" fullWidth>Entrar</Button>
      </div>
    </form>
  )
}

export default Login