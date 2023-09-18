import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField, Container, Grid, Paper, Typography, Snackbar, Alert } from '@mui/material';
import { fetchClientById, updateClient } from '../../api';
import { LoadingContext } from '../../App';

const EditClient = () => {
  const [, setLoading] = useContext(LoadingContext)
  const { clientId } = useParams();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [clientInfo, setClientInfo] = useState([]);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    shop_name: '',
    mobile_no: '',
    email_id: '',
    gst_no: '',
    address: '',
    zip_code: '',
    area: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateClient(formData, clientId);
      if (response === 'Client Edited Successfully') {
        setSeverity('success');
      } else {
        setSeverity('error');
      }
      setSnackbarMessage(response);
    } catch (err) {
      console.error(err);
      setSnackbarMessage(err.response.data);
      setSeverity('error');
    }

    setSnackbarOpen(true);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true)
        const response = await fetchClientById(clientId)
        setClientInfo(response)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchClients()
  }, [clientId, setLoading]);

  useEffect(() => {
    if (clientInfo.length > 0) {
      const client = clientInfo[0];
      setFormData({
        first_name: client.first_name,
        last_name: client.last_name,
        shop_name: client.shop_name,
        mobile_no: client.mobile_no,
        email_id: client.email_id,
        gst_no: client.gst_no,
        address: client.address,
        zip_code: client.zip_code,
        area: client.area,
      });
    }
  }, [clientInfo]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container component="main">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography mb={3} variant="h5">
          Edit Client
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                fullWidth
                required
                mb={3}
                mt={3}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                fullWidth
                required
                mb={3}
                mt={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Company Name"
                name="shop_name"
                value={formData.shop_name}
                onChange={handleInputChange}
                fullWidth
                required
                mb={3}
                mt={3}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Mobile No"
                name="mobile_no"
                value={formData.mobile_no}
                onChange={handleInputChange}
                fullWidth
                required
                mb={3}
                mt={3}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email ID (Optional)"
                name="email_id"
                value={formData.email_id}
                onChange={handleInputChange}
                fullWidth
                mb={3}
                mt={3}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="GST Number (Optional)"
                name="gst_no"
                value={formData.gst_no}
                onChange={handleInputChange}
                fullWidth
                mb={3}
                mt={3}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                fullWidth
                required
                mb={3}
                mt={3}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                fullWidth
                required
                mb={3}
                mt={3}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Zip Code"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleInputChange}
                fullWidth
                required
                mb={3}
                mt={3}
              />
            </Grid>
          </Grid>

          <Button mt={3} type="submit" variant="contained" color="primary" fullWidth>
            Edit Client
          </Button>
        </form>
      </Paper>

      {/* Form Errors */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      >
        <Alert mb={3} severity={severity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditClient;
