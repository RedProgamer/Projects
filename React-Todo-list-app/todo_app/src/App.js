import { Button, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './App.css';
import db  from './firebase';
import './Todo.css';
import Todo from './Todo';
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  // getting data from firebase database, and fetching it to our todo APP
  useEffect(() => {
    // this code fires everytime app.js is called
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => doc.data()));
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})));
    });
  }, []);


  const addTodo = (event) => {
      event.preventDefault();  //present the page from refreshing everytime
      
      db.collection('todos').add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      // setTodos([...todos, input]);
      setInput('');  //clearning the input field everytime
  }

  return (
    <div className="App">
      <div className="header">
        <h1 className="main-header">Todo App</h1>
      </div>

        <div className="container">
          <div className="userInputFields">
            <FormControl className="userInputControl">
                <InputLabel htmlFor="my-input" variant="outlined" color="secondary">📝Write a todo</InputLabel>
                <Input id="my-input" className="userInput" color="secondary" type="text" value={input} onChange={event => setInput(event.target.value)}/>
                <FormHelperText id="my-helper-text">Populate your todo app</FormHelperText>
            </FormControl>
            <Button disabled={!input} type="submit" className="submitButton" onClick={addTodo} variant="contained" color="primary" size="small">Add Todo</Button> 
          </div>

          <div className="actual__todos">
            <ul>
              {todos.map(todo => (
                <Todo todo={todo} />
              ))}
            </ul>
          </div>
        </div>
    </div>
  );
}

export default App;
