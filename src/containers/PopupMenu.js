import React from 'react';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Menu, {MenuItem} from 'material-ui/Menu';

class PopupMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(event) {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose(cb) {
        return () => this.setState({anchorEl: null}, cb);
    };

    render() {
        const {anchorEl} = this.state;

        return (
            <div>
                <IconButton
                    arial-label="More"
                    arial-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose(this.props.handleEditUser)}>Edit user</MenuItem>
                    <MenuItem onClick={this.handleClose(this.props.handleOpenUserTransactions)}>Show transactions</MenuItem>
                    <MenuItem onClick={this.handleClose(this.props.handleOpenBalanceDialog)}>Update balance</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default PopupMenu;