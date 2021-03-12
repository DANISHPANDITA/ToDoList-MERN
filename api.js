import axios from "axios";

export const createNewTodo = (newT) => {
  axios.post("http://localhost:4000/upload", {
    todoName: newT,
  });
};

export const updateTodo = (todo, id) => {
  axios.patch(`http://localhost:4000/${id}`, {
    todoName: todo,
  });
};

export const Delete = (id) => {
  axios.delete(`http://localhost:4000/${id}`);
};
