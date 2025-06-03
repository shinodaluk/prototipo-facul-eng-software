import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { PageContainer } from '@toolpad/core/PageContainer'
import React from 'react'

const page = () => {
  return (
    <PageContainer>
        <Typography variant="h4" className="mb-4">Editar meus dados</Typography>
        <div className="mb-2">
            <TextField label="Nome" variant="outlined" fullWidth />
        </div>
        <div className="mb-2">
            <TextField type="email" label="E-mail" variant="outlined" fullWidth />
        </div>
        <div className="mb-2">
            <TextField type="password" label="Senha" variant="outlined" fullWidth />
        </div>
        <Grid container justifyContent="space-around" alignItems="center">
            <Button color="success" variant="contained">
                Salvar
            </Button>
        </Grid>
    </PageContainer>
  )
}

export default page