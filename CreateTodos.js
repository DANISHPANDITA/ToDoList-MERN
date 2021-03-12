import React, { useState } from "react";
import { useHistory } from "react-router";
import { createNewTodo } from "./api.js";
import "./CreateTodos.css";
function CreateTodos() {
  const [newTodo, setNewTodo] = useState("");
  const history = useHistory();
  const createTodo = () => {
    if (newTodo) {
      createNewTodo(newTodo);
      history.push("/");
    } else {
      alert("No new Todo");
    }
  };
  return (
    <div className="createNewTodo">
      <h2>
        <em>Create New Todo</em>
      </h2>
      <input
        autoFocus
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={createTodo}>Create</button>
    </div>
  );
}

export default CreateTodos;
