"use client"

import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { PageContainer } from '@toolpad/core/PageContainer'
import QRCode from 'qrcode'
import { fakerPT_BR as faker } from "@faker-js/faker";

const Page = () => {
    const [qrcode, setQrcode] = useState<string | null>(null);

    const generateQRCode = async (text: string) => {
        try {
            const qrCodeDataUrl = await QRCode.toDataURL(text);
            setQrcode(qrCodeDataUrl);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    useEffect(() => {
        generateQRCode(faker.string.alphanumeric(100));
    }, [])


  return (
    <PageContainer>
        <Typography variant="h5">QRCode</Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center" flex={1}>
            {
                qrcode !== null && (
                    <img src={qrcode} alt="QR Code" />
                )
                
            }
        </Grid>
    </PageContainer>
  )
}

export default Page