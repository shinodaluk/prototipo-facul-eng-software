'use client';
import { createTheme } from '@mui/material/styles';
import { ptBR } from '@mui/x-data-grid/locales';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
}, ptBR);

export default theme;