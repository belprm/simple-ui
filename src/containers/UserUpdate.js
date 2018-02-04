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
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

class UserUpdate extends React.Component {
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
            snackbar_text: '',
            enabled: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    getUser(user_id) {
        Api.getUser(user_id).then(data => {
            this.setState({
                user_id: {val: data.user_id},
                user_name: {val: data.user_name},
                user_custom: {val: data.user_custom},
                email: {val: data.email},
                enabled: data.enabled
            })
        });
    }

    componentDidMount() {
        this.getUser(this.props.user_id);
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
            email: this.state.email.val,
            enabled: this.state.enabled
        };

        Api.updateUser(user).then(response => {
            if (response.hasOwnProperty('http_status_code')) {
                switch (response.http_status_code) {
                    case 200:
                        break;

                    case 404:
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
                this.props.handleClose(true);
            }
        });
    }

    handleSnackbarClose() {
        this.setState({
            show_snackbar: false
        });
    }

    handleChecked(event, checked) {
        this.setState({
            enabled: checked
        })
    }

    render() {
        const {onClick, classes, handleClose} = this.props;

        return (
            <div>
                <Dialog
                    fullScreen
                    open={true}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                Update User
                            </Typography>
                            <Button color="inherit" onClick={this.handleSubmit}>
                                update
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
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.enabled}
                                    onChange={this.handleChecked}
                                />
                            }
                            label={this.state.enabled ? "Enabled" : "Disabled"}
                        />
                    </FormGroup>
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

export default withStyles(styles)(UserUpdate);