import { CircularProgress, Stack } from '@mui/material'
import React from 'react'

const SimpleLoader = () => {
  return (
    <Stack sx={{height: '100%', display: 'grid', placeContent: 'center'}} ><CircularProgress/></Stack>
  )
}

export default SimpleLoader