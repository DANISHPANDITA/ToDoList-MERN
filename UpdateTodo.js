import { updateTodo } from "./api.js";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import "./UpdateTodo.css";
function UpdateTodo() {
  const history = useHistory();
  const match = useRouteMatch();
  const [TODO, setTODO] = useState("");
  const [UpdatedTodo, setUpdatedTodo] = useState("");

  useEffect(() => {
    const fetchDataById = async () => {
      fetch(`http://localhost:4000/${match.params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTODO(data);
        });
    };
    fetchDataById();
  }, [match.params.id]);
  
  const onSubmit = () => {
    if (UpdatedTodo) {
      updateTodo(UpdatedTodo, match.params.id);
      history.push("/");
    } else {
      alert("No new Todo");
    }
  };
  
  return (
    <div className="updateTodoPage">
      <h2>
        Old Todo : <em className="createTodoName">{TODO.todoName}</em>{" "}
      </h2>
      <div className="UpdateInput">
        <input
          value={UpdatedTodo}
          onChange={(e) => setUpdatedTodo(e.target.value)}
        />
        <button onClick={onSubmit}>Save</button>
      </div>
    </div>
  );
}

export default UpdateTodo;
