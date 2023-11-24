// AddressDisplay.jsx
import React, { useEffect, useState } from 'react';
import { Geocoding } from '@react-google-maps/api';

const UserAddress = ({ latitude, longitude }) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDXiDzWu_Q58pFWPqiBz6Y2LTS3iNqg-Cw`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setAddress(data.results[0].formatted_address);
        //   console.log(data.results)
        } else {
          setAddress('Address not found');
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    fetchAddress();
  }, [latitude, longitude]);

  return <div>{address}</div>;
};

export default UserAddress;