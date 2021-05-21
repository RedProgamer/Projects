import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

function Todo(props) {
    return (
        <List>
            <ListItem>
            <ListItemAvatar>
                <Avatar src="">
                </Avatar>
            </ListItemAvatar>
                <ListItemText primary="Todo" secondary={props.text} />
            </ListItem>
        </List>
    )
}

export default Todo;
