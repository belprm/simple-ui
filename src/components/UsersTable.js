import React from 'react';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import PopupMenu from '../containers/PopupMenu';

const UsersTable = ({
                        users,
                        recordsTotal,
                        page,
                        rowsPerPage,
                        onChangePage,
                        onChangeRowsPerPage,
                        handleOpenEditUser,
                        handleOpenUserTransactions,
                        handleOpenBalanceDialog
                    }) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Custom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Register Date</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Wallet Amount</TableCell>
                <TableCell>Wallet Currency</TableCell>
                <TableCell>Enabled</TableCell>
                <TableCell>{''}</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {users.map(user => (
                <TableRow key={user.user_id}>
                    <TableCell>{String(user.user_id)}</TableCell>
                    <TableCell>{String(user.user_name)}</TableCell>
                    <TableCell>{String(user.user_custom)}</TableCell>
                    <TableCell>{String(user.email)}</TableCell>
                    <TableCell>{String(user.register_date)}</TableCell>
                    <TableCell>{String(user.balance)}</TableCell>
                    <TableCell>{String(user.wallet_amount)}</TableCell>
                    <TableCell>{String(user.wallet_currency)}</TableCell>
                    <TableCell>{String(user.enabled)}</TableCell>
                    <TableCell>
                        <PopupMenu
                            handleEditUser={() => handleOpenEditUser(user.user_id)}
                            handleOpenUserTransactions={() => handleOpenUserTransactions(user.user_id)}
                            handleOpenBalanceDialog={()=>handleOpenBalanceDialog(user.user_id, user.balance)}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
        <TableFooter>
            <TableRow>
                <TablePagination
                    count={recordsTotal}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                />
            </TableRow>
        </TableFooter>
    </Table>
);

export default UsersTable;
