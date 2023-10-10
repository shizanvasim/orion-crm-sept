import React, { useContext, useState, useEffect } from 'react';

import {
    TableHead,
    Table,
    Paper,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    Checkbox,
    ButtonGroup,
    IconButton,
    Toolbar,
    alpha,
    Typography,
    Tooltip,
    Button,
    Stack
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

import axios from 'axios';

import { Link } from 'react-router-dom';

import { LoadingContext } from '../App';


const columns = [
    { id: 'client_id', label: 'ID' },
    { id: 'first_name', label: 'First Name' },
    { id: 'last_name', label: 'Last Name' },
    { id: 'shop_name', label: 'Company Name' },
    { id: 'mobile_no', label: 'Mobile' },
    { id: 'area', label: 'Area' },
];



function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        All Clients
                    </Typography>
                )}

                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Add New Client">
                        <Button startIcon={<Add />} variant='contained'>
                        <Link to="/dashboard/add-new-client">New Client</Link>
                        </Button>
                    </Tooltip>
                )}
            </Stack>
        </Toolbar>
    );
}

const UserPage2 = () => {
    const [, setLoading] = useContext(LoadingContext);
    const [clients, setClients] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [selected, setSelected] = useState([]);
    const [isSelectAll, setSelectAll] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = clients.map((client) => client.client_id);
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const rows = clients

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                axios.get('/clients')
                    .then(res => setClients(res.data))
                    .then(() => setLoading(false))
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])

    useEffect(() => {
        console.log(selected)
    }, [selected])


    return (
        <Paper>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    indeterminate={selected > 0 && selected < rows.length}
                                    checked={selected.length === rows.length}
                                    onChange={handleSelectAllClick}
                                    inputProps={{
                                        'aria-label': 'select all desserts',
                                    }}
                                />
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell key={column.id}>{column.label}</TableCell>
                            ))}
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                const isItemSelected = isSelected(row.client_id);
                                return (
                                    <TableRow
                                        key={row.client_id} // Unique key for TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.client_id)} // Use client_id here
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isItemSelected} />
                                        </TableCell>
                                        {columns.map((column) => (
                                            <TableCell key={`${column.id}-${row.client_id}`}>{row[column.id]}</TableCell> // Unique key for TableCell
                                        ))}
                                        <TableCell>
                                            <ButtonGroup>
                                                <IconButton><Link to={`${row.client_id}`}><Edit /></Link></IconButton>
                                                <IconButton color='error'><Delete /></IconButton>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default UserPage2