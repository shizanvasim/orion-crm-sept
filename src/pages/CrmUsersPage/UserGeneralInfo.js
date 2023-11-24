import React from 'react';
import { Avatar, Typography } from '@mui/material';
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
const UserGeneralInfo = ({user}) => {
    console.log(user)
    return (
        <div className={styles.userInfoContainer} style={{width: '50%'}}>
            {/* <Avatar src={user.avatarUrl} alt={user.name} className={styles.avatar} /> */}
            <div>
                <Typography variant='body1' sx={{background: '#161616', display: 'inline', p: 0.5, color: '#f5f5f5'}}>{user.role}</Typography>
                <Typography variant="subtitle1" sx={{mt: 2}} className={styles.userName}>
                    {(user.username)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {user.email}
                </Typography>
                <Typography variant="body1" mt={2} color="textSecondary">
                    Joined On: {new Date(user.created_at).toLocaleDateString()}
                </Typography>
            </div>
        </div>
    );
};

export default UserGeneralInfo;
