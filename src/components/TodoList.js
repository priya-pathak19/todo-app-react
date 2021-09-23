import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

const savedTodoItem = () => {
  let lists = localStorage.getItem("todos");
  if (lists) {
    return JSON.parse(localStorage.getItem("todos"));
    
  } else {
    
    return [];
}
}

function TodoList() {
    
  const [todos, setTodos] = useState(savedTodoItem());

      useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
   
  }, [todos])

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  
    console.log(...todos);
    

  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos} 
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}
export default TodoList;
