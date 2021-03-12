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
