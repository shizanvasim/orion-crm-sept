import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Stack, Typography, Button, IconButton } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import SimpleLoader from '../../SimpleLoader'
import UserLocation from './UserLocation'
import UserGeneralInfo from './UserGeneralInfo'
import EditGeneralInfo from './EditGeneralInfo'

const EditUserPage = () => {
    const navigation = useNavigate()
    const { userId } = useParams()
    const [userData, setUserData] = useState([])
    const [location, setLocation] = useState({})
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/users/${userId}`)
                setUserData(response.data)
                setLocation(JSON.parse(response.data.login_location))
                setLoader(false)
                // console.log('userData', userData)
            } catch (error) {
                console.error('Error Fetching User', error);
            }
        }

        fetchUser()
    }, [userId])



    // useEffect(()=> {
    //     console.log(userData)
    // }, [userData])
    return (
        <>
            {loader ? (
                <SimpleLoader />
            ) : (
                <>
                    <Stack sx={{ m: 4 }} direction={'row'} alignItems={'center'}>
                        <IconButton onClick={()=> navigation(-1)}><ArrowBack /></IconButton>
                        <Typography>Edit User</Typography>
                    </Stack>
                    <Stack sx={{ m: 4 }} direction={'row'}>
                        <EditGeneralInfo user={userData} />
                    </Stack>
                </>
            )}
        </>
    )
}

export default EditUserPage