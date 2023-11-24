import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Stack, IconButton, InputAdornment, TextField, Checkbox, Button, Alert, Typography } from '@mui/material';
import Iconify from '../../../components/iconify';
import { login as apiLogin, adminLogin } from '../../../api';
// import userStore from '../../../stores/UserStore';

const LoginForm = () => {
  // const { username } = userStore;
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [givenUsername, setGivenUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [showMessage, setShowMessage] = useState(false);

  const handleUserName = (e) => setGivenUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await adminLogin(givenUsername, password);
      setAlertMessage(response.message);
      setShowMessage(true);

      if (response.success) {
        setSeverity('success');
        navigate('/', { replace: true });
      } else {
        setSeverity('error');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // useEffect(() => {
  //   fetchUsers()
  //     .then((data) => {
  //       // You may use data if needed
  //       // console.log(data);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching users:", err);
  //     });
  // }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField name="username" label="Username" onChange={handleUserName} />
        <TextField
          onChange={handlePassword}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Stack direction={'row'} alignItems={'center'}>
          <Checkbox name="remember" id="remember" />
          <Typography>Remember me</Typography>
        </Stack>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <Button fullWidth size="large" type="submit" variant="contained">
        Login
      </Button>

      {showMessage && <Alert severity={severity}>{alertMessage}</Alert>}
    </form>
  );
};

export default LoginForm;