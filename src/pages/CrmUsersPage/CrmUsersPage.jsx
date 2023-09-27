import React, { Paper, useEffect, useLayoutEffect, useState } from 'react'
import { Button, Container, Stack, Typography, TableContainer, Table, TableBody, TableRow, TableCell, Checkbox, Avatar } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Iconify from '../../components/iconify/Iconify'
import Scrollbar from '../../components/scrollbar'
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';

const TABLE_HEAD = [
    { id: 'user_id', label: 'ID', alignRight: false },
    { id: 'username', label: 'Name', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },
    { id: 'joinedOn', label: 'Joined On', alignRight: false },
    { id: '' },
];

const CrmUsersPage = () => {
    const [users, setUsers] = useState([])

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [selected, setSelected] = useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = users.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, clientId) => {
        const isSelected = selected.includes(clientId);
        let newSelected = [];

        if (!isSelected) {
            newSelected = [...selected, clientId];
        } else {
            newSelected = selected.filter((id) => id !== clientId);
        }

        setSelected(newSelected);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const isNotFound = !users.length && !!filterName;

    useLayoutEffect(() => {
        (async () => {
            axios.get('/users')
                .then(data => setUsers(data.data))
                .catch(err => console.error(err))
        })()
    }, [])

    useEffect(() => {
        console.table(users)
    }, [users])


    return (
        <>
            <Helmet>
                <title> Users | Orion CRM </title>
            </Helmet>

            <Container>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant='h4'>Users</Typography>
                    <Button startIcon={<Iconify icon="eva:plus-fill" />} variant={'contained'}>Add New</Button>
                </Stack>

                <Stack mt={4}>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={users.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {users.map((row) => {
                                        const {
                                            client_id: clientId,
                                            username,
                                            last_name: lastName,
                                            shop_name: shopName,
                                            mobile_no: mobileNo,
                                            email,
                                            role
                                        } = row;


                                        const fullName = `${username} ${lastName}`;
                                        const selectedUser = selected.indexOf(clientId) !== -1;

                                        return (
                                            <TableRow hover key={clientId} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, clientId)} />
                                                </TableCell>

                                                <TableCell align="left">{clientId}</TableCell>

                                                <TableCell component="th" scope="row" padding="none">
                                                    <Link style={{ textDecoration: 'none', color: 'unset' }} to={`${clientId}`}>
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            <Avatar alt={fullName} src={null} />
                                                            <Typography variant="subtitle2" noWrap>
                                                                {username}
                                                            </Typography>
                                                        </Stack>
                                                    </Link>
                                                </TableCell>

                                                <TableCell align="left">{email}</TableCell>

                                                <TableCell align="left">{role}</TableCell>

                                                <TableCell align="left">{mobileNo}</TableCell>


                                                {/* <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell> */}
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" paragraph>
                                                        Not found
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        No results found for &nbsp;
                                                        <strong>&quot;{filterName}&quot;</strong>.
                                                        <br /> Try checking for typos or using complete words.
                                                    </Typography>
                                                </Paper>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                </Stack>

            </Container>
        </>
    )
}

export default CrmUsersPage