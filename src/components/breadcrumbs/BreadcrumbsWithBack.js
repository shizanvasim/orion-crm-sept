import { Breadcrumbs, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'

const BreadcrumbsWithBack = ({openedUser}) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
  <Link
    style={{color: "unset"}}
    to="/dashboard/clients"
  >
    Clients
  </Link>
  <Typography color="text.primary">{openedUser}</Typography>
</Breadcrumbs>
  )
}

export default BreadcrumbsWithBack
