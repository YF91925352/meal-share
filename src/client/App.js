import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import Meallist from "./MealList";

function App() {
  return (
    <Router>
      <Route exact path="/Meallist">
        <Meallist />
      </Route>
    </Router>
  );
}

export default App;
