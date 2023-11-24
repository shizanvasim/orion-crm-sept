import React, { useState } from 'react';
import { Avatar, Button, Input, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { makeStyles } from '@mui/styles';


// Define styles using makeStyles
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

// User Info Component
const EditGeneralInfo = ({ user }) => {
    const editApiUrl = `/users/${user.user_id}`
    const navigate = useNavigate()


    const [formData, setFormData] = useState({
        role: user.role,
        username: user.username,
        email: user.email,
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = async () => {
        await axios.put(editApiUrl, formData).then(data => alert(data.data)).then(() => navigate(-1))
    }
    return (
        <div className={styles.userInfoContainer} style={{ width: '50%' }}>
            <Typography variant='body1' mb={4}>
                Role:<br /> <Input name="role" onChange={(e) => handleChange(e)} value={formData.role} />
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

            <Button onClick={handleEdit} variant='contained'><Edit />Edit</Button>
        </div>
    );
};

export default EditGeneralInfo;
