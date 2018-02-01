import React from 'react';
import UsersTable from '../components/UsersTable';
import Api from '../tools/Api';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            recordsTotal: 0,
            page: 0,
            rowsPerPage: 10,
            offset: 0
        };

        this.onChangePage = this.onChangePage.bind(this);
        this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
    }

    getUsers() {
        Api.users(`offset=${this.state.offset}&limit=${this.state.rowsPerPage}`).then(data => {
            this.setState({
                users: data.data,
                recordsTotal: data.recordsTotal
            })
        });
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

    render() {
        return (
            <UsersTable {...this.state} onChangePage={this.onChangePage} onChangeRowsPerPage={this.onChangeRowsPerPage}/>
        );
    }
}