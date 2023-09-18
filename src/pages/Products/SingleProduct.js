import { Grid, Box, TableContainer, Table, TableRow, TableCell } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { keys } from 'lodash'
import { fetchProductById } from '../../api'
import palette from '../../theme/palette'

const SingleProduct = () => {
    const [product, setProduct] = useState({})
    const { productId } = useParams()

    // const fetch =

    useEffect(() => {
        fetchProductById(productId)
            .then((data) => {
                setProduct(data)
            })
            .catch(err => console.error(err))
    }, [productId])

    const {
        product_id: productIdData,
        product_name: productName,
        description: descriptionData,
        price: priceData,
        category: categoryData,
        stock_quantity: stockQuantity,
        release_date: releaseDate,
        is_discontinued: isDiscontinued
    } = product

    const date = new Date(releaseDate)

    const formattedReleaseDate = `${date.getDate() <= 9 ? 0 : ''}${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`


    return (
        <Box elevation={3} style={{ padding: '20px', margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <img src={'https://m.media-amazon.com/images/I/51QF8woKr5S._AC_UF1000,1000_QL80_.jpg'} alt={productName} style={{ aspectRatio: '16/9', width: '100%', objectFit: 'contain' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TableContainer component={Box}>
                        <Table>
                            <tbody>
                                <TableRow>
                                    <TableCell variant="head">ID</TableCell>
                                    <TableCell>{productIdData}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">Product Name</TableCell>
                                    <TableCell>{productName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">Description</TableCell>
                                    <TableCell>{descriptionData}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">Category</TableCell>
                                    <TableCell>{categoryData}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">Stock Quantity</TableCell>
                                    <TableCell>{stockQuantity}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">Release Date</TableCell>
                                    <TableCell>{formattedReleaseDate}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">Price</TableCell>
                                    <TableCell>₹{priceData}</TableCell>
                                </TableRow>
                                {!isDiscontinued && (<TableRow>
                                    <TableCell variant="head" />
                                    <TableCell sx={{ color: palette.error.main }}>Discontinued</TableCell>
                                </TableRow>)}
                            </tbody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SingleProduct