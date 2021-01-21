import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { UpdateTodos } from "./routes/UpdateTodos";
import { TodosContextProvider } from "./contexts/TodosContext";

function App() {
  return (
    <TodosContextProvider>
      <div className="flex justify-center py-0 px-4 h-screen">
        <Router>
          <Switch>
            <Route exact path="/" component={Home}>
              <Home />
            </Route>
            <Route exact path="/todos/:id" component={UpdateTodos}>
              <UpdateTodos />
            </Route>
          </Switch>
        </Router>
      </div>
    </TodosContextProvider>
  );
}

export default App;
