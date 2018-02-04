import React from 'react';
import UsersTable from '../components/UsersTable';
import TransactionsTable from '../components/TransactionsTable';
import UserCreate from './UserCreate';
import UserUpdate from './UserUpdate';
import Api from '../tools/Api';
import UpdateBalance from './UpdateBalance';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            recordsTotal: 0,
            page: 0,
            rowsPerPage: 5,
            offset: 0,
            userCreateDialogState: false,
            userUpdateDialogState: false,
            userTransactionsDialogState: false,
            userUpdateId: null,
            userTransactions: [],
            userUpdateBalanceState: false,
            userBalanceId: null,
            userBalance: null
        };

        this.onChangePage = this.onChangePage.bind(this);
        this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
        this.toggleUserCreateDialog = this.toggleUserCreateDialog.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.handleOpenEditUser = this.handleOpenEditUser.bind(this);
        this.handleCloseEditUser = this.handleCloseEditUser.bind(this);
        this.handleOpenUserTransactions = this.handleOpenUserTransactions.bind(this);
        this.handleCloseUserTransactions = this.handleCloseUserTransactions.bind(this);
        this.handleOpenBalanceDialog = this.handleOpenBalanceDialog.bind(this);
        this.handleCloseBalanceDialog = this.handleCloseBalanceDialog.bind(this);
    }

    getUsers() {
        Api.listUsers(`offset=${this.state.offset}&limit=${this.state.rowsPerPage}`).then(data => {
            this.setState({
                users: data.data,
                recordsTotal: data.recordsTotal
            })
        });
    }

    getUserTransactions(user_id) {
        Api.getUserTransactions(user_id).then(data => {
            this.setState({
                userTransactions: data
            })
        });
    }

    componentDidMount() {
        this.getUsers();
    }

    onChangePage(event, page) {
        this.setState((prevState) => {
            return {
                page: page,
                offset: prevState.rowsPerPage * page
            };
        }, this.getUsers);
    }

    onChangeRowsPerPage(event) {
        this.setState(() => {
            return {
                rowsPerPage: event.target.value
            };
        }, this.getUsers);
    }

    toggleUserCreateDialog(update = false) {
        this.setState((prevState) => {
            return {
                userCreateDialogState: !prevState.userCreateDialogState
            };
        }, () => {
            if (update) {
                this.getUsers();
            }
        });
    }

    handleOpenEditUser(user_id) {
        this.setState({
            userUpdateDialogState: true,
            userUpdateId: user_id
        })
    }

    handleCloseEditUser(update = false) {
        this.setState({
            userUpdateDialogState: false
        }, () => {
            if (update) {
                this.getUsers();
            }
        });
    }

    handleOpenUserTransactions(user_id) {
        this.setState({
            userTransactionsDialogState: true
        }, () => {
            this.getUserTransactions(user_id);
        });
    }

    handleCloseUserTransactions() {
        this.setState({
            userTransactionsDialogState: false,
            userTransactions: []
        })
    }

    handleOpenBalanceDialog(user_id, amount) {
        this.setState({
            userUpdateBalanceState: true,
            userBalanceId: user_id,
            userBalance: amount
        })
    }

    handleCloseBalanceDialog(update = false) {
        this.setState({
            userUpdateBalanceState: false
        }, () => {
            if (update) {
                this.getUsers();
            }
        });
    }

    render() {
        return (
            <div>
                <UsersTable
                    {...this.state}
                    onChangePage={this.onChangePage}
                    onChangeRowsPerPage={this.onChangeRowsPerPage}
                    handleOpenEditUser={this.handleOpenEditUser}
                    handleOpenUserTransactions={this.handleOpenUserTransactions}
                    handleOpenBalanceDialog={this.handleOpenBalanceDialog}
                />
                <UserCreate
                    {...this.state}
                    onClick={this.toggleUserCreateDialog}
                />
                {this.state.userUpdateDialogState ? <UserUpdate
                    handleClose={this.handleCloseEditUser}
                    user_id={this.state.userUpdateId}/> : null}

                {this.state.userTransactionsDialogState ?
                    <TransactionsTable
                        userTransactions={this.state.userTransactions}
                        handleClose={this.handleCloseUserTransactions}
                    /> : null}

                {this.state.userUpdateBalanceState ?
                    <UpdateBalance
                        handleClose={this.handleCloseBalanceDialog}
                        user_id={this.state.userBalanceId}
                        user_amount={this.state.userBalance}
                    /> : null}
            </div>
        );
    }
}