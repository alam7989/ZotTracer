import React from 'react';
import { Button } from '@mui/material';
import { PanoramaFishEyeIcon } from '@mui/icons-material';

export default function ShapeOption() {
    return (
        <Button variant="contained" startIcon={<PanoramaFishEyeIcon/>}/>
    )
}