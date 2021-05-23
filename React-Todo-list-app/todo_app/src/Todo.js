import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Modal, Avatar} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from '@material-ui/core/styles';
import { green, pink } from '@material-ui/core/colors';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import './Todo.css';
import db from './firebase';

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

  const useEditStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const editClasses = useEditStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const classes = useStyles();
    const updateTodo = () => {
      // update the todo with new input text
      db.collection('todos').doc(props.todo.id).set({
        todo: input,
      }, { merge: true });

      setOpen(false);
    }

    return (
      <>
      <Modal
        open={open}
        onClose={handleClose}>
          <div className={editClasses.paper}>
            <h1>Hello Modal</h1>
            <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}></input>
            <Button onClick={updateTodo} variant="contained" color="primary">Confirm</Button>
          </div>
        </Modal>
        <div className="mainContent">
          <List className="todo__list">
              <ListItem className="objectInfo">
              <ListItemAvatar>
                  <Avatar className={classes.pink}>
                      <AssignmentIcon />
                  </Avatar>
              </ListItemAvatar>
                  <ListItemText primary={props.todo.todo} secondary="Deadline ⏰" />
              </ListItem>
              <div className="editObjectInfo">
                <Button onClick={e => setOpen(true)}>Edit <EditIcon fontSize="small"></EditIcon></Button>
                <DeleteForeverIcon className="deleteTodo" onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
              </div>
          </List>
        </div>
        </>
    ) 
}

export default Todo;
