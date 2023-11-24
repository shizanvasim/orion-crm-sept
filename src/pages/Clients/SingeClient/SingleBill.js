import React, { useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import SimpleLoader from '../../../SimpleLoader';
import { instance } from '../../../api';



const SingleBill = ({ route }) => {
    const navigate = useNavigate();

    const { billId } = useParams()
    const [billData, setBillData] = useState({})
    // console.log(billId)
    const [loader, setLoader] = useState(false)

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchBillData = async () => {
            setLoader(true)
            try {
                const response = await instance.get(`/bills/${billId}`)
                setBillData(response.data[0])
                if (billData.product) {
                    setProducts(JSON.parse(billData.product))
                    // console.log('products', products)
                }
                setLoader(false)
            } catch (error) {
                console.error('Error Fetching Bill Data', error)
            }
        }
        fetchBillData();
    }, [])

    useEffect(() => {
        console.log(billData)
        if (billData.product) {
            setProducts([...products, billData.product])
            // console.log(JSON.parse(billData.product))
            // console.log('products', products)
        }
    }, [billData])

    useEffect(() => {
        console.log(products)
    }, [products])

    return (
        <>
            {loader ? (
                <SimpleLoader />
            ) : (
                <>
                    <Stack direction={'row'} justifyContent={''} alignItems={'center'}>
                        <IconButton onClick={() => navigate(-1)}><ArrowBack /></IconButton>
                        <Typography variant='h6'>Billing Details</Typography>
                    </Stack>
                    <Stack m={4} alignItems={"center"}>

                        <Typography variant='h2' mb={4}>{`₹${billData?.amount}`}</Typography>

                        {/* <Typography variant='h4' sx={{ textTransform: 'uppercase', mb: 4 }}>Shizan Vasim</Typography> */}


                        <Typography variant='h6' mb={2}>Products</Typography>

                        <TableContainer sx={{ width: '50%', border: '1px solid #00000050', mb: 4 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {Array.isArray(products) && products.map(d => { */}
                                    {/* return ( */}
                                    {products && products[0]?.map(p => {
                                        const product = JSON.parse(p)
                                        return (
                                            <TableRow>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.stock}</TableCell>
                                                <TableCell>₹{product.amount}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                    {/* ) */}
                                    {/* })} */}
                                </TableBody>
                            </Table>
                        </TableContainer>


                        <Typography variant='h4' sx={{ textTransform: 'uppercase', bgcolor: (billData.payment_status) === 'Paid' ? 'lightgreen' : 'tomato', p: 1, borderRadius: 1 }}>{billData?.payment_status}</Typography>


                        <Typography variant='body1' my={4}>Invoice Date: {new Date(billData.invoice_date).toLocaleDateString()}</Typography>

                        <Typography variant='body1'>Payment Date: {new Date(billData.payment_date).toLocaleDateString()}</Typography>

                        <Typography variant='body1' my={4}>Invoice ID: {billData.invoice_id}</Typography>

                        <Typography variant='body1'>Invoice No: {billData.invoice_no}</Typography>
                    </Stack>
                </>
            )}
        </>
    )
}

export default SingleBill