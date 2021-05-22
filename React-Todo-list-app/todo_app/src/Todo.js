import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import PageviewIcon from '@material-ui/icons/Pageview';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from '@material-ui/core/styles';
import { green, pink } from '@material-ui/core/colors';

// import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    pink: {
      color: theme.palette.getContrastText(pink[500]),
      backgroundColor: pink[500],
    },
    green: {
      color: '#fff',
      backgroundColor: green[500],
    },
  }));

function Todo(props) {

    const classes = useStyles();

    return (
        <List>
            <ListItem>
            <ListItemAvatar>
                <Avatar className={classes.green}>
                    <AssignmentIcon />
                </Avatar>
            </ListItemAvatar>
                <ListItemText primary="Todo" secondary={props.text} />
            </ListItem>
        </List>
    )
}

export default Todo;
