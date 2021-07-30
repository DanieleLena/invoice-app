import React from "react";
import "./sass/main.scss";
import { NavBar, Main, InvoiceDetails } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Route exact path="/">
        <Main />
      </Route>
      <Route exact path="/:id" children={<InvoiceDetails />}></Route>
    </Router>
  );
}

export default App;
