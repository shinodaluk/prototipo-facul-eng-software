import React from 'react'
import "./login.css"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const RecuperarConta = () => {
  return (
    <form className="flex flex-col">
      <div className="text-center">
        <h5 className="font-semibold mb-2 text-center text-xl">Recuperar Conta</h5>
      </div>
      <div className="mb-4">
        <p className="text-sm mb-2 font-semibold text-[#333335]">E-mail</p>
        <TextField variant="outlined" size="small" fullWidth placeholder="e-mail" type="email"/>
      </div>
      <div>
        <Button variant="contained" fullWidth>Receber link de recuperação</Button>
      </div>
    </form>
  )
}

export default RecuperarConta