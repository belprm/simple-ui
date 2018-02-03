import React from 'react';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Api from "../tools/Api";

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

class UserCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: {
                val: '',
                error: false
            },
            user_name: {
                val: '',
                error: false
            },
            user_custom: {
                val: '',
                error: false
            },
            email: {
                val: '',
                error: false
            },
            show_snackbar: false,
            snackbar_text: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    }

    handleChange(name) {
        return ((event) => {
            this.setState({
                [name]: {val: event.target.value},
            });
        });
    };

    handleSubmit(event) {
        const user = {
            user_id: this.state.user_id.val,
            user_name: this.state.user_name.val,
            user_custom: this.state.user_custom.val,
            email: this.state.email.val
        };

        Api.createUser(user).then(response => {
            console.log(response);

            if (response.hasOwnProperty('http_status_code')) {
                switch (response.http_status_code) {
                    case 200:
                        break;

                    case 409:
                    case 500:
                        this.setState({
                            show_snackbar: true,
                            snackbar_text: response.message
                        });

                        break;

                    case 422:
                        const errors = response.extended_message.property_errors;

                        Object.keys(errors).map((key, index) => {
                            this.setState((prevState) => {
                                return {
                                    [key]: {error: true, val: prevState[key].val},
                                    show_snackbar: true,
                                    snackbar_text: errors[key][0]
                                };
                            });
                        });

                        break;
                }
            } else {
                this.props.onClick(true);
            }
        });

        //this.props.handleSubmit(user);
    }

    handleSnackbarClose() {
        this.setState({
            show_snackbar: false
        });
    }

    render() {
        const {onClick, classes, userCreateDialogState} = this.props;

        return (
            <div>
                <Button onClick={onClick}>Create User</Button>
                <Dialog
                    fullScreen
                    open={userCreateDialogState}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={onClick} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                Create User
                            </Typography>
                            <Button color="inherit" onClick={this.handleSubmit}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <TextField
                        id="user_id"
                        label="User ID"
                        value={this.state.user_id.val}
                        onChange={this.handleChange('user_id')}
                        error={this.state.user_id.error}
                    />
                    <TextField
                        id="user_name"
                        label="User name"
                        value={this.state.user_name.val}
                        onChange={this.handleChange('user_name')}
                        error={this.state.user_name.error}
                    />
                    <TextField
                        id="user_custom"
                        label="User custom"
                        value={this.state.user_custom.val}
                        onChange={this.handleChange('user_custom')}
                        error={this.state.user_custom.error}
                    />
                    <TextField
                        id="email"
                        label="User email"
                        value={this.state.email.val}
                        onChange={this.handleChange('email')}
                        error={this.state.email.error}
                    />
                </Dialog>
                <Snackbar
                    open={this.state.show_snackbar}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleSnackbarClose}
                        >
                            <CloseIcon/>
                        </IconButton>,
                    ]}
                    onClose={this.handleSnackbarClose}
                    message={<span id="message-id">{this.state.snackbar_text}</span>}
                    autoHideDuration={6000}
                />
            </div>
        );
    }
}

export default withStyles(styles)(UserCreate);