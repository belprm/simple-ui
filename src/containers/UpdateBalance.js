import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Api from "../tools/Api";
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

export default class FormDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: {
                val: props.user_amount,
                error: false
            },
            comment: {
                val: '',
                error: false
            },
            show_snackbar: false,
            snackbar_text: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    }

    handleChange(name) {
        return ((event) => {
            this.setState({
                [name]: {val: event.target.value},
            });
        });
    }

    handleSubmit() {
        const payload = {
            user_id: this.props.user_id,
            amount: this.state.amount.val,
            comment: this.state.comment.val
        };

        Api.updateBalance(payload).then(response => {
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
                                    snackbar_text: errors[key]
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

    render() {
        return (
            <div>
                <Dialog
                    open
                    onClose={this.props.handleClose}
                    aria-labelledby="update-balance"
                >
                    <DialogTitle id="update-balance">User Balance</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            id="amount"
                            label="Add to balance"
                            type="number"
                            fullWidth
                            value={this.state.amount.val}
                            onChange={this.handleChange('amount')}
                            error={this.state.amount.error}
                        />
                        <TextField
                            id="comment"
                            label="comment"
                            multiline
                            rows="4"
                            value={this.state.comment.val}
                            onChange={this.handleChange('comment')}
                            error={this.state.comment.error}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Update
                        </Button>
                    </DialogActions>
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