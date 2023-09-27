import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Grid, Paper, Typography, Snackbar, Alert, Avatar, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { postClient } from '../../api';
import { LoadingContext } from '../../App';

const AddNewClient = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useContext(LoadingContext);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  // State to hold the selected file
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    profile_picture: null,
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

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileInputChange = (event) => {
    setFormData({ ...formData, profile_picture: event.target.files[0] });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = {
      ...formData
    };


    console.log(formDataToSend)


    try {
      setLoading(true)
      const response = await postClient(formDataToSend);
      if (response === 'Client Added Successfully') {
        setSeverity('success');
        
        
        // Redirect to clients route
        navigate('/dashboard/clients');
        window.location.reload();
        setLoading(false)
      } else {
        setSeverity('error');
      }
      setSnackbarMessage(response);
    } catch (err) {
      console.error(err);
      setSnackbarMessage('An error occurred. Please try again.');
      setSeverity('error');
    }

    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => console.log(selectedFile), [selectedFile])

  return (
    <Container component="main">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography mb={3} variant="h5">
          Add New Client
        </Typography>
        <form encType="multipart/form-data" method='post' onSubmit={handleSubmit}>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12}>
              {selectedFile === null ?
                (<Avatar alt={'Shizan'} src={null} />)
                :
                (<>
                  <IconButton onClick={() => setSelectedFile(null)} sx={{ position: 'absolute' }}>
                    <Close sx={{ color: '#009966' }} />
                  </IconButton>
                  <img width={100} src={selectedFile} alt={formData.first_name} />
                </>)
              }
              <Typography>Upload Profile Picture</Typography>
              <TextField
                type="file"
                name="profile_picture"
                fullWidth
                accept="image/*"
                onChange={handleFileInputChange}
                mb={3} // Add margin at the bottom
                mt={3} // Add margin at the top
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                fullWidth
                required
                mb={3} // Add margin at the bottom
                mt={3} // Add margin at the top
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
                mb={3} // Add margin at the bottom
                mt={3} // Add margin at the top
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
                mb={3} // Add margin at the bottom
                mt={3} // Add margin at the top
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
                mb={3} // Add margin at the bottom
                mt={3} // Add margin at the top
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email ID (Optional)"
                name="email_id"
                value={formData.email_id}
                onChange={handleInputChange}
                fullWidth
                mb={3} // Add margin at the bottom
                mt={3} // Add margin at the top
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="GST Number (Optional)"
                name="gst_no"
                value={formData.gst_no}
                onChange={handleInputChange}
                fullWidth
                mb={3} // Add margin at the bottom
                mt={3} // Add margin at the top
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
                mb={3} // Add margin at the bottom
                mt={3} // Add margin at the top
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
                mb={3} // Add margin at the bottom
                mt={3} // Add margin at the top
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
                mb={3} // Add margin at the bottom
                mt={3} // Add margin at the top
              />
            </Grid>
          </Grid>

          <Button mt={3} type="submit" variant="contained" color="primary" fullWidth>
            Add Client
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

export default AddNewClient;