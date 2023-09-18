import PropTypes from 'prop-types';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

const BreadcrumbsWithBack = ({ openedUser }) => (
  <Breadcrumbs aria-label="breadcrumb">
    <Link style={{ color: "unset" }} to="/dashboard/clients">
      Clients
    </Link>
    <Typography color="text.primary">{openedUser}</Typography>
  </Breadcrumbs>
);

BreadcrumbsWithBack.propTypes = {
  openedUser: PropTypes.string,
};

export default BreadcrumbsWithBack;
