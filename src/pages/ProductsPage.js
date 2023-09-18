import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
// @mui
import { Container, LinearProgress, Stack, Typography } from '@mui/material';
import { LoadingContext } from '../App';
import { fetchProducts } from '../api';
// components
import { ProductSort, ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
// import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [loading, setLoading] = useContext(LoadingContext);

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
        // console.log(products); // Log the fetched data here
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Make sure to set loading to false on error
      });
  }, []);


  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

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
