import React from "react"
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    options: {
        width: '100%',
        marginBottom: theme.spacing(2)
    }
}));


const ManagePageListOption = ({node, text, callback, color}) => {
    const classes = useStyles();

    const Item = node;
    return (
        <Paper elevation={3} className={classes.options}>
            <ListItem button onClick={callback}>
                <ListItemAvatar>
                    <Avatar style={{backgroundColor: color}}>
                        <Item.type/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={text}/>
            </ListItem>
        </Paper>
    )
};

ManagePageListOption.propTypes = {
    node: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
};

ManagePageListOption.defaultProps = {
    callback: () => {
        alert('Clicked!')
    }
};

export default ManagePageListOption