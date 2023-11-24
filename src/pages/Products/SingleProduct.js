import { Grid, Box, TableContainer, Table, TableRow, TableCell, ButtonGroup, Button, Stack, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { keys } from 'lodash'
import { ArrowBack } from '@mui/icons-material'
import axios from 'axios'
import { fetchProductById } from '../../api'
import palette from '../../theme/palette'
import SimpleLoader from '../../SimpleLoader'

const SingleProduct = () => {
    const [loader, setLoader] = useState(false)
    const [product, setProduct] = useState({})
    const { productId } = useParams()

    const navigation = useNavigate(-1)

    // const fetch =

    useEffect(() => {
        setLoader(true)
        fetchProductById(productId)
            .then((data) => {
                setProduct(data)
                setLoader(false)
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

    const handleDelete = async ()=>{
        setLoader(true)
        try {
            const response = await axios.delete(`/products/${product.product_id}`)
            alert(response.data)
            console.log(response)
            setLoader(false)
            navigation(-1)
        } catch (error) {
            console.error('Error Deleting Product');
        }
    }

    return (
        <Box elevation={3} style={{ padding: '20px', margin: '20px' }}>
            {loader ? <SimpleLoader /> : (
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <Stack alignItems={'center'} direction={'row'} mb={8}>
                            <><IconButton onClick={()=> navigation(-1)}><ArrowBack/></IconButton> Go Back</>
                        </Stack>
                        <Stack direction={'row'} sx={{mb: 4}}>
                            <Button variant='contained'><Link to={`edit-product/${product.product_id}`}>Edit</Link></Button>
                            <Button onClick={handleDelete}>Delete</Button>
                        </Stack>
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
            )}
        </Box>
    )
}

export default SingleProduct