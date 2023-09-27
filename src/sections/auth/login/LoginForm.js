import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Stack, IconButton, InputAdornment, TextField, Checkbox, Button, Alert } from '@mui/material';
import Iconify from '../../../components/iconify';
import { fetchUsers, login as apiLogin } from '../../../api';
import userStore from '../../../stores/UserStore';


const LoginForm = () => {
  const { username } = userStore

  const navigate = useNavigate();

  // const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [givenUsername, setGivenUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('')
  const [severity, setSeverity] = useState('info')
  const [showMessage, setShowMessage] = useState(false)

  const handleUserName = (e) => {
    setGivenUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const enteredUser = users.find((user) => givenUsername === user.username);

    try {
      const response = await apiLogin(givenUsername, password)
      setAlertMessage(response.message)
      setShowMessage(true)
      if(response.success){
        // const loginResponse = await login(givenUsername, password);
        setSeverity('success')
        navigate('/', {replace: true})
      }else{
        setSeverity('error')
      }
    } catch (error) {
      console.log("error", error)
    }
  };

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        // setUsers(data);
        // console.log(data)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // useEffect(() => console.log(username), [username])

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
        <Checkbox name="remember" label="Remember me" />
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