import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Stack, Typography, Button, IconButton, Input, Select, MenuItem } from '@mui/material'
import { Add, ArrowBack } from '@mui/icons-material'
import SimpleLoader from '../../SimpleLoader'
import UserGeneralInfo from './UserGeneralInfo'

const AddUserPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    })
    const [loader, setLoader] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleAdd = async () => {
        setLoader(true)
        await axios.post('/users', formData).then(data => alert(data.data)).then(() => navigate(-1))
        setLoader(false)
    }

    const styles = {
        userInfoContainer: {
            display: 'flex',
            alignItems: 'center',
            // gap: theme.spacing(2),
        },
        avatar: {
            // width: theme.spacing(6),
            // height: theme.spacing(6),
        },
        userName: {
            fontWeight: 'bold',
        },
    };


    const handleSubmit = ()=>{
        console.log(formData)
    }

    return (
        <>
            {loader ? (
                <SimpleLoader />
            ) : (
                <>
                    <Stack sx={{ m: 4 }} direction={'row'} alignItems={'center'}>
                        <IconButton onClick={() => navigate(-1)}><ArrowBack /></IconButton>
                        <Typography>Add User</Typography>
                    </Stack>
                    <Stack sx={{ m: 4 }} direction={'row'}>
                        <div className={styles.userInfoContainer} style={{ width: '50%' }}>
                            <Typography mb={4} variant="body1" className={styles.inputField}>
                                Role:{' '}<br/>
                                <Select name="role" value={formData.role} onChange={(e) => handleChange(e)}>
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="salesman">Salesman</MenuItem>
                                </Select>
                            </Typography>

                            <Typography variant='body1' mb={4}>
                                Username:<br /> <Input name="username" onChange={(e) => handleChange(e)} value={formData.username} />
                            </Typography>

                            <Typography variant='body1' mb={4}>
                                Email:<br /> <Input name="email" onChange={(e) => handleChange(e)} value={formData.email} />
                            </Typography>

                            <Typography variant='body1' mb={4}>
                                Enter New Password:<br /> <Input name="password" onChange={(e) => handleChange(e)} value={formData.password} />
                            </Typography>

                            <Button onClick={handleAdd} variant='contained'><Add />Add</Button>
                        </div>
                    </Stack>
                </>
            )}
        </>
    )
}

export default AddUserPage
