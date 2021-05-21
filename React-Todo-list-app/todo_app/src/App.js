import React, { useState } from 'react';
import { Button, FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core'; 
import {  } from '@material-ui/core'; 
import './App.css';

function App() {
  const [todos, setTodos] = useState(['Don\'t be gay', 'Please don\'t be gay', 'sheesh']);
  const [input, setInput] = useState('');
  console.log(todos);
  console.log(input);


  const addTodo = (event) => {
      event.preventDefault();  //present the page from refreshing everytime
      setTodos([...todos, input]);
      setInput('');  //clearning the input field everytime
  }

  return (
    <div className="App">

      <h1>Todo App</h1>

      <FormControl>
        <InputLabel htmlFor="my-input">📝Write a todo</InputLabel>
        <Input id="my-input" type="text" value={input} onChange={event => setInput(event.target.value)}/>
        <FormHelperText id="my-helper-text">Populate your todo app</FormHelperText>
      </FormControl>

      <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add Todo</Button> 

      <ul>
        {todos.map(todo => (
          <li>{todo}</li>
        ))}
        </ul>
    </div>
  );
}

export default App;
