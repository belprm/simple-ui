import React from 'react';
import UsersTable from '../components/UsersTable';
import UserCreate from './UserCreate';
import Api from '../tools/Api';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            recordsTotal: 0,
            page: 0,
            rowsPerPage: 5,
            offset: 0,
            userCreateDialogState: false
        };

        this.onChangePage = this.onChangePage.bind(this);
        this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
        this.toggleUserCreateDialog = this.toggleUserCreateDialog.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    getUsers() {
        Api.listUsers(`offset=${this.state.offset}&limit=${this.state.rowsPerPage}`).then(data => {
            this.setState({
                users: data.data,
                recordsTotal: data.recordsTotal
            })
        });
    }

    createUser(data) {
    }

    componentDidMount() {
        this.getUsers();
    }

    // componentDidUpdate

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

    render() {
        return (
            <div>
                <UsersTable
                    {...this.state}
                    onChangePage={this.onChangePage}
                    onChangeRowsPerPage={this.onChangeRowsPerPage}
                />
                <UserCreate
                    {...this.state}
                    onClick={this.toggleUserCreateDialog}
                    handleSubmit={this.createUser}
                />
            </div>
        );
    }
}