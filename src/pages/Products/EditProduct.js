import { ArrowBack, Edit } from '@mui/icons-material'
import { Button, IconButton, Input, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SimpleLoader from '../../SimpleLoader'

const EditProduct = () => {
    const { productId } = useParams()
    const navigation = useNavigate()
    const [loader, setLoader] = useState(false)

    const [formData, setFormData] = useState({
        product_name: "",
        description: "",
        price: 0,
        category: "",
        stock_quantity: 0
    })


    useEffect(() => {
        const fetchProduct = async () => {
            setLoader(true)
            try {
                const response = await axios.get(`/products/${productId}`)
                const { product_name: productName, description, price, category, stock_quantity: stockQuantity } = response.data
                setFormData({
                    ...formData,
                    product_name: productName,
                    description,
                    price,
                    category,
                    stock_quantity: stockQuantity
                })
                console.log(formData)
                setLoader(false)
            } catch (error) {
                console.error('Error Fetching Product', error);
            }
        }

        fetchProduct()
    }, [])


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async () => {
        setLoader(true)
        try {
            const response = await axios.put(`/products/${productId}`, formData)
            alert(response.data)
            setLoader(false)
            navigation(-1)
        } catch (error) {
            console.error('Error Editing Product', error);
        }
    }

    return (
        <Stack m={4} justifyContent={'center'}>
            <Typography mb={4}><IconButton onClick={() => navigation(-1)}><ArrowBack /></IconButton>Edit Product</Typography>

            {loader ? <SimpleLoader /> : (
                <Stack>
                    <TextField name='product_name' onChange={(e) => handleChange(e)} sx={{ mb: 4 }} label='Product Name' value={formData.product_name} />
                    <TextField name='description' onChange={(e) => handleChange(e)} sx={{ mb: 4 }} label='Description' value={formData.description} />
                    <TextField name='price' onChange={(e) => handleChange(e)} sx={{ mb: 4 }} label='Price' value={formData.price} type='number' />
                    <TextField name='category' onChange={(e) => handleChange(e)} sx={{ mb: 4 }} label='Category' value={formData.category} />
                    <TextField name='stock_quantity' onChange={(e) => handleChange(e)} sx={{ mb: 4 }} label='Stock Quantity' value={formData.stock_quantity} type='number' />
                    <Button onClick={handleSubmit} variant='contained' startIcon={<Edit/>}>Edit Product</Button>
                </Stack>
            )}
        </Stack>
    )
}

export default EditProduct