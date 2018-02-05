import React from 'react';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const UsersTable = ({userTransactions, handleClose}) => {
    const Body = () => {
        if (userTransactions.length) {
            return (
                userTransactions.map(transaction => (
                    <TableRow key={transaction.operation_id}>
                        <TableCell>{String(transaction.operation_id)}</TableCell>
                        <TableCell>{String(transaction.transaction_id)}</TableCell>
                        <TableCell>{String(transaction.coupon_id)}</TableCell>
                        <TableCell>{String(transaction.coupon_code)}</TableCell>
                        <TableCell>{String(transaction.transaction_type)}</TableCell>
                        <TableCell>{String(transaction.comment)}</TableCell>
                        <TableCell>{String(transaction.date)}</TableCell>
                        <TableCell>{String(transaction.amount)}</TableCell>
                        <TableCell>{String(transaction.sum)}</TableCell>
                        <TableCell>{String(transaction.currency)}</TableCell>
                        <TableCell>{String(transaction.status)}</TableCell>
                        <TableCell>{String(transaction.user_balance)}</TableCell>
                        <TableCell>{String(transaction.user_id)}</TableCell>
                    </TableRow>
                ))
            )
        } else {
            return (<div>
                <p>User has no transactions.</p>
            </div>);
        }
    };

    return (
        <Dialog
            open
            fullScreen
        >
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" onClick={handleClose} aria-label="Close">
                        <CloseIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Operation ID</TableCell>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell>Coupon ID</TableCell>
                        <TableCell>Coupon Code</TableCell>
                        <TableCell>Transaction Type</TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Sum</TableCell>
                        <TableCell>Currency</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>User Blance</TableCell>
                        <TableCell>User ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Body/>
                </TableBody>
            </Table>
        </Dialog>
    );
};

export default UsersTable;
