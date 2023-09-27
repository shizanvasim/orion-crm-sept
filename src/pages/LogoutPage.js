import axios from 'axios'
import React, { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutPage = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await axios.post('/login/logout')
            if (response.data.success) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                navigate('/login', { replace: true })
            }
        } catch (error) {
            console.log(error)
        }
    }


    useLayoutEffect(() => {
        handleLogout()
    })
    return (
        <div>LogoutPage</div>
    )
}

export default LogoutPage