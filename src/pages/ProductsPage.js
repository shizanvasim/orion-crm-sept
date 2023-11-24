import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Iconify from '../components/iconify';
import { LoadingContext } from '../App';
import { fetchProducts } from '../api';
// components
import { ProductSort, ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
// import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [, setLoading] = useContext(LoadingContext);

  const [products, setProducts] = useState([])

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [setLoading]);


  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack direction={'row'}justifyContent={'space-between'} pb={4}>
          <Typography variant="h4">
            Products
          </Typography>

          <Button startIcon={<Iconify icon="eva:plus-fill" />} variant={'contained'}><Link to={'add-product'}>Add New</Link></Button>
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={products} />
      </Container>
    </>
  );
}
