import React from 'react'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination, IconButton, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

import { Delete, RemoveRedEye } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { instance } from '../../../api';

const tableColumns = ['ID', 'Invoice No', 'Invoice Date', 'Amount', 'Payment Status', 'Payment Date']

const ClientBilling = ({info}) => {
  const [open, setOpen] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);

  const firstRowIndex = page * rowsPerPage;
  const lastRowIndex = firstRowIndex + rowsPerPage;
  const currentPageData = data.slice(firstRowIndex, lastRowIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteBill = () => {
    handleClickOpen();
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/bills/client/${info[0].client_id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      <Typography variant='h5' mb={4}>Billing</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableColumns.map((th, index) => (
                <>
                  <TableCell key={index} component="th" scope="col">
                    {th}
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row, index) => {
              return (
                <>
                  <TableRow>
                    <TableCell>{row.invoice_id}</TableCell>
                    <TableCell>{row.invoice_no}</TableCell>
                    <TableCell>{new Date(row.invoice_date).toLocaleDateString('en-CA')}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell sx={{ background: (row.payment_status.toLowerCase() === 'paid' ? 'lightgreen' : 'tomato') }}>{row.payment_status}</TableCell>
                    <TableCell>{new Date(row.payment_date).toLocaleDateString('en-CA')}</TableCell>
                    <TableCell>
                      <ButtonGroup sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton><Link to={`${row.invoice_id}`}><RemoveRedEye /></Link></IconButton>
                        <IconButton onClick={deleteBill}><Delete /></IconButton>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>

                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{"Delete Bill"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Are you sure you want to delete this bill?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button onClick={async () => {
                        try {
                          await instance.delete(`/bills/${row.invoice_id}`);
                          handleClose();
                          // Refresh the data
                          const response = await instance.get('/bills');
                          setData(response.data);
                        } catch (error) {
                          console.error('Error deleting bill:', error);
                        }
                      }}>
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>

              )
            })}
          </TableBody>

        </Table>
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  )
}

export default ClientBilling