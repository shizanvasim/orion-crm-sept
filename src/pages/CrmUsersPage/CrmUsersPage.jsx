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
    Typography,
    Toolbar,
    alpha,
    Tooltip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Stack
} from '@mui/material';
import { Add, Delete, Edit, FilterList, RemoveRedEye } from '@mui/icons-material';

import axios from 'axios';

import { Link } from 'react-router-dom';

import { LoadingContext } from '../../App';


const columns = [
    { id: 'user_id', label: 'ID' },
    { id: 'username', label: 'Username' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
    { id: 'created_at', label: 'Joined On' },
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
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    All Users
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <Delete />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterList />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}




const CrmUsersPage = () => {
    const [open, setOpen] = useState(false);

    const [, setLoading] = useContext(LoadingContext);
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [selected, setSelected] = useState([]);
    const [isSelectAll, setSelectAll] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = users.map((client) => client.user_id);
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

    const rows = users

    // Delete user
    const askToDelete = (id) => {
        setOpen(true)
    }

    const handleConfirmDelete = async (deleteId) => {
        try {
            const response = await axios.delete(`/users/${deleteId}`);
            console.log('User successfully deleted.');
            setOpen(false);
            // Remove the deleted user from the local state
            setUsers(users.filter(user => user.user_id !== deleteId));
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                axios.get('/users')
                    .then(res => setUsers(res.data))
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
        <>
            <Stack mb={4} alignItems={'flex-end'}><Link to='add-user'><Button sx={{ width: '100%' }} variant='contained'><Add />Add User</Button></Link></Stack>
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
                                    const isItemSelected = isSelected(row.user_id);
                                    return (
                                        <TableRow
                                            key={row.user_id} // Unique key for TableRow
                                            hover
                                            // onClick={(event) => handleClick(event, row.user_id)} // Use user_id here
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isItemSelected} />
                                            </TableCell>
                                            {columns.map((column) => (
                                                <TableCell key={`${column.id}-${row.user_id}`}>{row[column.id]}</TableCell> // Unique key for TableCell
                                            ))}
                                            <TableCell>
                                                <ButtonGroup>
                                                    <IconButton><Link to={`${row.user_id}`}><RemoveRedEye /></Link></IconButton>
                                                    <IconButton><Link to={`edit/${row.user_id}`}><Edit /></Link></IconButton>
                                                    <IconButton color='error' onClick={() => askToDelete(row.user_id)}><Delete /></IconButton>
                                                </ButtonGroup>
                                            </TableCell>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Confirm Delete"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Are you sure you want to delete this user?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={()=> handleConfirmDelete(row.user_id)} color="error" autoFocus>
                                                        Delete
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
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
        </>
    )
}

export default CrmUsersPage