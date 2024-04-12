import './App.css';
import { useState, useEffect } from 'react';
import Header from './MyComponents/Header';
import Todos from './MyComponents/Todos';
import Footer from './MyComponents/Footer';
import AddToDo from './MyComponents/AddToDo';
import About from './MyComponents/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const storedTodos = localStorage.getItem("todos");
  const initToDo = storedTodos ? JSON.parse(storedTodos) : [];
  const [todos, setTodos] = useState(initToDo);
  const onDelete = (todo) => {
    console.log("I am on delete of todo", todo);
    // let index = todos.indexOf(todo);
    // todos.splice(index,1);

    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
  }

  const addToDo = (title, desc) => {
    console.log("I am adding this todo", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myToDo = {
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myToDo]);
    console.log(myToDo);
  }

  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  
  return (
    <>
    <Router>
      <Header title="My to-dos List" searchBar={true} />
      <Routes>
        <Route exact path="/" element = {
              <>
              <AddToDo addToDo={addToDo} />
             <Todos todos={todos} onDelete={onDelete} />
              </>
         } />
        <Route path="/about" element = {
          <About /> } />
      </Routes>
      <Footer />
      </Router>
    </>
  );
}

export default App;
