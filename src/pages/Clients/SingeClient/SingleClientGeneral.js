import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  // Container,
  Stack,
  Avatar,
  Typography,
  // Accordion,
  // AccordionSummary,
  // AccordionDetails,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import Iconify from '../../../components/iconify/Iconify';
// import AccordionComp from '../../../components/accordion/AccordionComp';

// ------------------------------------------------------

const SingleClientGeneral = ({ info, handleDelete }) => {
  // const { clientId, first_name, last_name, shop_name, mobile_no, email_id, gst_no, address, area, zip_code } = info[0];
  const {
    client_id: clientId,
    first_name: firstName,
    last_name: lastName,
    shop_name: shopName,
    mobile_no: mobileNo,
    email_id: emailId,
    gst_no: gstNo,
    address: addressData,
    area: areaData,
    zip_code: zipCode
  } = info[0]
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction={['column', 'row']} rowGap={3} columnGap={3}>
      <Box sx={{
        width: '100%', // Default width for mobile and tablet
        '@media (min-width: 992px)': {
          width: '35%', // Width for desktop and larger screens
        },
      }}
      >
        <Card>
          <Stack direction="column" alignItems="center" spacing={2} mt={3} mb={3} mx={3}>
            <Avatar alt={`${firstName} ${lastName}`} src={null} />
            <Stack alignItems={'center'}>
              <Typography variant="h5" noWrap>
                {`${firstName} ${lastName}`}
              </Typography>
              <Typography variant="p" noWrap>
                {shopName}
              </Typography>
            </Stack>

            <Stack direction={'row'} spacing={3}>
              <Button variant="contained">
                <Iconify sx={{ mr: 1 }} icon={'eva:edit-fill'} />
                <Link to={`/dashboard/edit-client/${clientId}`}>Edit</Link>
              </Button>
              <Button onClick={handleClickOpen} variant="contained" color="error">
                <Iconify sx={{ mr: 1 }} icon={'eva:trash-2-outline'} />
                Delete
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Box>

      <Box sx={{ width: '100%', '@media (width >= 992px)': { width: '65%' } }}>
        <Card sx={{ p: 3 }}>
          {/* Personal Details */}
          <Typography sx={{ fontWeight: '600' }} mb={1}>
            Personal Details
          </Typography>
          <Table className="single-page-table">
            <TableBody>
              <React.Fragment key={clientId}>
                <TableRow>
                  <TableCell sx={{ width: '30%' }}>Client ID</TableCell>
                  <TableCell sx={{ width: '70%' }}>{clientId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%' }}>Full Name</TableCell>
                  <TableCell sx={{ width: '70%' }}>
                    {firstName} {lastName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%' }}>Company Name</TableCell>
                  <TableCell sx={{ width: '70%' }}>{shopName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%' }}>Mobile No</TableCell>
                  <TableCell sx={{ width: '70%' }}>{mobileNo}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%' }}>Email ID</TableCell>
                  <TableCell sx={{ width: '70%' }}>{emailId}</TableCell>
                </TableRow>
              </React.Fragment>
            </TableBody>
          </Table>
          {/* Other Details */}
          <Typography sx={{ fontWeight: '600' }} mt={3}>
            Other Details
          </Typography>
          <Table className="single-page-table">
            <TableBody>
              <React.Fragment key={clientId}>
                <TableRow>
                  <TableCell sx={{ width: '30%' }}>GST Number</TableCell>
                  <TableCell sx={{ width: '70%' }}>{gstNo}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%' }}>Address</TableCell>
                  <TableCell sx={{ width: '70%' }}>{addressData}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%' }}>Area</TableCell>
                  <TableCell sx={{ width: '70%' }}>{areaData}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: '30%' }}>Zip Code</TableCell>
                  <TableCell sx={{ width: '70%' }}>{zipCode}</TableCell>
                </TableRow>
              </React.Fragment>
            </TableBody>
          </Table>
        </Card>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Client"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this client?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {
            handleDelete(clientId)
            handleClose()
          }} color='error' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

// Define PropTypes for your component
SingleClientGeneral.propTypes = {
  info: PropTypes.arrayOf(
    PropTypes.shape({
      client_id: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      shop_name: PropTypes.string.isRequired,
      mobile_no: PropTypes.string.isRequired,
      email_id: PropTypes.string.isRequired,
      gst_no: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      area: PropTypes.string.isRequired,
      zip_code: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default SingleClientGeneral;
