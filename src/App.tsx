import React from "react";
import Main from "./pages/Main";
import HowTo from "./pages/HowTo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import "./styles/global.scss";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/howto" exact>
          <HowTo />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
