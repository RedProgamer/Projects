import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from '@material-ui/core/styles';
import { green, pink } from '@material-ui/core/colors';
import './Todo.css';

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
        <List className="todo__list">
            <ListItem>
            <ListItemAvatar>
                <Avatar className={classes.green}>
                    <AssignmentIcon />
                </Avatar>
            </ListItemAvatar>
                <ListItemText primary={props.text} secondary="Deadline ⏰" />
            </ListItem>
        </List>
    )
}

export default Todo;
