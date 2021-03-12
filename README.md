# ToDoList-MERN
For MERN learning beginners

Make a react app first with the help of command: npx create-react-app todolistmern. 

Develop backend first so that you can test if the logic is fine or not.

For backend in this app, we install packages - **mongoose, cors, express, axios, nodemon**.
Make a cluster in a MongoDb app on Mongodb Site.

**Create a file - server.js. In it, we first check our backend for app:**

import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening to port : ${PORT}`);
});

**Activate your localhost by writing the code in terminal as : nodemon server.js**

**Now, after creating a cluster, we get URL on MongoDb for connection to our backend like this:
mongodb+srv://<dbname>:<password>@cluster0.5aaai.mongodb.net/Todos?retryWrites=true&w=majority
**
  Use dbname and password used in Mongodb app.
  
**Now, in server.js , add this connection so as to connect backend to database. For this, we import mongoose module and use it to connect as shown below:**
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = 4000;
const url = "mongodb+srv://<dbname>:<password>@cluster0.5aaai.mongodb.net/Todos?retryWrites=true&w=majority"


app.use(express.json());
app.use(cors());

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Cound not connect");
  });

app.listen(PORT, () => {
  console.log(`Listening to port : ${PORT}`);
});

**Now, make a file called model.js in which we make a Schema(format for our data model). In model.js, we do following: **

import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema({
  todoName: String,
});

const Todos = mongoose.model("Todos", blogSchema);

export default Todos;

**This Todos will be used in server.js to perform CRUD operations in database. So, now go to server.js and do the make your file now as following:**
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Todos from "./model.js";

const app = express();
const PORT = 4000;
const url = "mongodb+srv://<dbname>:<password>@cluster0.5aaai.mongodb.net/Todos?retryWrites=true&w=majority"


app.use(express.json());
app.use(cors());

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Cound not connect");
  });

app.get("/", (req, res) =>
  Todos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
);
app.get("/:id", (req, res) => {
  Todos.findById(req.params.id).then((data) => res.status(200).send(data));
});

app.post("/upload", (req, res) => {
  const model = req.body;
  Todos.create(model, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.patch("/:id", (req, res) => {
  Todos.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});
app.delete("/:id", (req, res) => {
  Todos.findByIdAndRemove(req.params.id).exec();
});


app.listen(PORT, () => {
  console.log(`Listening to port : ${PORT}`);
});

**The end Points are generated as get,post,patch and delete. Get is used two times to first get all the todos and secondly getting a todo by its ID so it can be updated. PATCH end point is used for updation, POST for creating a new and DELETE for deletion.**

**With this, our backend part is complete, you can check your applogic on POSTMAN app.**
Now, we will start making api. 

For that, we create a file called **api.js** and do in it as follows:

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

API is a file or a package which is used to communicate between a backend and frontend of an app.
**In api.js, we created three functions and exported them so that they can be used in other files, one for creating new todo, one for updating and one for deleting.**

Install an NPM package called **react-router-dom**. It helps us to make the web app dynamic. 
Now, we go to app.js. in app.js , we do following:

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListAll from "./ListAll";
import UpdateTodo from "./UpdateTodo";
import CreateTodos from "./CreateTodos";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/create">
            <CreateTodos />
          </Route>
          <Route exact path="/:id">
            <UpdateTodo />
          </Route>
          <Route exact path="/">
            <ListAll />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
**Run Your code by typing in terminal: npm start **

As one can see, there will be 3 files- CreateTodo, UpdateTodo and ListAll which will be imported here.
**So,create a file called ListAll.js first and write the code in it as follows:**

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Delete } from "./api.js";
import "./ListAll.css";

function ListAll() {
  const [todos, setTodos] = useState([]);
  const url = "http://localhost:4000"
  useEffect(() => {
    const fetchData = async () => {
      await fetch(url)
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

**In UpdateTodo.js, write the following code:**
import { updateTodo } from "./api.js";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import "./UpdateTodo.css";
function UpdateTodo() {
  const history = useHistory();
  const match = useRouteMatch();
  const [TODO, setTODO] = useState("");
  const [UpdatedTodo, setUpdatedTodo] = useState("");
**Use match.params.id to match the id with id of a todo**
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

**In CreateTodo.js, write the code as:**
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


**Your first MERN app is ready,enjoy and try to make front-end better by developing css files imported in above 3 files.**
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
