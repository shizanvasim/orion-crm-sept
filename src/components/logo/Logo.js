import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import logo from '../../assets/titans-logo.png';

const Logo = forwardRef(() => (
  <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
    <img src={logo} alt='titans logo' />
  </Link>
));

export default Logo;