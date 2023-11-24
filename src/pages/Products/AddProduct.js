import { ArrowBack } from '@mui/icons-material'
import { Button, IconButton, Input, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SimpleLoader from '../../SimpleLoader'

const AddProduct = () => {
    const navigation = useNavigate()
    const [loader, setLoader] = useState(false)

    const [formData, setFormData] = useState({
        product_name: "",
        description: "",
        price: 0,
        category: "",
        stock_quantity: 0
    })


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async () => {
        setLoader(true)
        try {
            const response = await axios.post('/products', formData)
            alert(response.data)
            setLoader(false)
            navigation(-1)
        } catch (error) {
            console.error('Error Posting Product', error);
        }
    }

    return (
        <Stack m={4} justifyContent={'center'}>
            <Typography mb={4}><IconButton onClick={() => navigation(-1)}><ArrowBack /></IconButton>Add New Product</Typography>

            {loader ? <SimpleLoader /> : (
                <Stack>
                    <TextField name='product_name' onChange={(e) => handleChange(e)} sx={{ mb: 4 }} label='Product Name' value={formData.product_name} />
                    <TextField name='description' onChange={(e) => handleChange(e)} sx={{ mb: 4 }} label='Description' value={formData.description} />
                    <TextField name='price' onChange={(e) => handleChange(e)} sx={{ mb: 4 }} label='Price' value={formData.price} type='number' />
                    <TextField name='category' onChange={(e) => handleChange(e)} sx={{ mb: 4 }} label='Category' value={formData.category} />
                    <TextField name='stock_quantity' onChange={(e) => handleChange(e)} sx={{ mb: 4 }} label='Stock Quantity' value={formData.stock_quantity} type='number' />
                    <Button onClick={handleSubmit} variant='contained'>Add Product</Button>
                </Stack>
            )}
        </Stack>
    )
}

export default AddProduct