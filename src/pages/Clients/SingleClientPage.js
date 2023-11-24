// SingleClientPage.js
import '../../assets/css/single-client-page.css';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Stack, Tabs, Tab } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Iconify from '../../components/iconify/Iconify';
import BreadcrumbsWithBack from '../../components/breadcrumbs/BreadcrumbsWithBack';

import { deleteClient, fetchClientById } from '../../api';
import SingleClientGeneral from './SingeClient/SingleClientGeneral';
import { LoadingContext } from '../../App';
import BlogPage from '../BlogPage';
import ClientBilling from './SingeClient/ClientBilling';

export default function SingleClientPage() {
  const [, setLoading] = useContext(LoadingContext);
  const navigate = useNavigate()
  const [clientInfo, setClientInfo] = useState([]);
  const { clientId } = useParams();
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleDelete = (id) => {
    setLoading(true)
    deleteClient(id)
      .then(data => {
        console.log(data)
        setLoading(false)
        navigate('/dashboard/clients');
        window.location.reload();
      }).catch(err => console.error(err))
  }

  useEffect(() => {
    setLoading(true);
    fetchClientById(clientId)
      .then((data) => {
        setClientInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [clientId, setLoading]);


  return (
    <Container>
      {clientInfo.map((info) => (
        <React.Fragment key={info.client_id}>
          <Helmet>
            <title>
              {info.first_name} {info.last_name} | Clients | Orion CRM
            </title>
          </Helmet>
          <Stack mb={5}>
            <BreadcrumbsWithBack openedUser={`${info.first_name} ${info.last_name}`} />
          </Stack>

          <Stack mb={3}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              aria-label="Client Tabs"
              sx={{
                '& .MuiTabs-scroller': {
                  display: 'flex',
                },
                '& .MuiTabs-flexContainer': {
                  padding: 0, // Remove padding
                },
                '& .MuiTab-root': {
                  minHeight: 'auto', // Adjust height
                  padding: '8px 16px', // Add padding to tabs
                },
              }}
            >
              <Tab
                icon={<Iconify sx={{ mr: 1 }} icon={'mingcute:profile-fill'} />}
                iconPosition="start"
                label="General"
              />
              <Tab
                icon={<Iconify sx={{ mr: 1 }} icon={'solar:bill-list-bold'} />}
                iconPosition="start"
                label="Billing"
              />
            </Tabs>
          </Stack>

          {/* General Tab */}
          {currentTab === 0 && <SingleClientGeneral info={clientInfo} handleDelete={handleDelete} />}
          {currentTab === 1 && <ClientBilling info={clientInfo} />}
        </React.Fragment>
      ))}
    </Container>
  );
}
