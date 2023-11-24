import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Stack, Typography } from '@mui/material';
import UserAddress from './UserAddress';

const containerStyle = {
    width: '100%',
    height: '400px'
};



function UserLocation({ userId, location }) {
    const { latitude = 0, longitude = 0 } = location || {};
    const [center, setCenter] = useState({
        lat: latitude,
        lng: longitude
    });


    // useEffect(() => {
    //     console.log('lat', latitude)
    // }, [latitude, longitude])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDXiDzWu_Q58pFWPqiBz6Y2LTS3iNqg-Cw"
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback((map) => {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback((map) => {
        setMap(null);
    }, []);

    return isLoaded ? (
        <Stack>
            <Typography mb={2} variant='h6'>Current Location</Typography>
            <UserAddress latitude={center.lat} longitude={center.lng} />
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {/* Marker */}
                {map && (
                    <Marker position={center} />
                )}
            </GoogleMap>
        </Stack>
    ) : <></>;
}

export default React.memo(UserLocation);