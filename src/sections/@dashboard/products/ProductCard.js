import PropTypes from 'prop-types';
// @mui
import { Card, Typography, Stack } from '@mui/material';
import {Link} from 'react-router-dom'
// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { product_id: productId, product_name: productName, price, category } = product;


  return (
    <Card>
      <Stack direction={'column'} spacing={2} sx={{ p: 2 }}>
        <Link to={`${productId}`} color="inherit" underline="hover">
          {/* <img style={{aspectRatio: '1/1', objectFit: 'contain'}} src="https://m.media-amazon.com/images/I/51QF8woKr5S._AC_UF1000,1000_QL80_.jpg" alt={product_name}/> */}
          <Typography variant="body1" noWrap>
            {category}
          </Typography>
          <Typography variant="subtitle1" noWrap>
            {productName}
          </Typography>
        </Link>

        <Stack direction="column" justifyContent="space-between">
          <Typography variant="subtitle2">
          ₹{price}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
