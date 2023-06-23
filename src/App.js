import React, { useState } from "react";
import "./style.css";
function App() {
  const [newItem, setNewItem] = useState("");

  const [todo, setTodo] = useState([]);

  function handlerSubmit(e) {
    e.preventDefault();

    if (newItem.length === 0) {
      return;
    } else {
      setTodo((creatItem) => {
        return [
          ...creatItem,
          {
            id: crypto.randomUUID(),
            title: newItem,
            completed: false,
          },
        ];
      });
    }

    setNewItem("");
  }

  function todoChecked(Id, completed) {
    setTodo((currentTodo) => {
      return currentTodo.map((todo) => {
        if (todo.id === Id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function handlerRemove(id) {
    setTodo((currentTodo) => {
      return currentTodo.filter((todo) => todo.id !== id);
    });
  }

  return (
    <div style={{ maxWidth: "400px" }}>
      <form className="todoForm" onSubmit={handlerSubmit}>
        <label>my Tod List</label>
        <input
          type="text"
          className="todoInput"
          value={newItem}
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
        />
        <button className="addBtn">Add</button>
      </form>
      <ul>
        {todo.length === 0 && "no todos"}
        {todo.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onClick={(e) => {
                  todoChecked(todo.id, e.target.checked);
                }}
              />
              <h1 className="itemName">{todo.title}</h1>
              <button
                className="deleteBtn"
                onClick={() => {
                  handlerRemove(todo.id);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
