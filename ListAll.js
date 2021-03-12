import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Delete } from "./api.js";
import "./ListAll.css";

function ListAll() {
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:4000")
        .then((res) => res.json())
        .then((data) => {
          setTodos(data);
        });
    };
    fetchData();
  }, [todos]);

  const handleDelete = (id) => {
    Delete(id);
  };

  return (
    <div className="list">
      <Link to="/create">Create Todo</Link>
      {todos ? (
        <table className="table">
          <thead>
            <tr>
              <th className="heading">TODO List Using MERN </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr className="dataRow" key={todo._id}>
                <td>{todo.todoName}</td>
                <td>
                  <div className="buttons">
                    <Link to={`/${todo._id}`}>
                      <button className="editButton">Edit TODO</button>{" "}
                    </Link>
                    <button
                      className="DeleteButton"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(todo._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>Empty</h1>
      )}
    </div>
  );
}

export default ListAll;
