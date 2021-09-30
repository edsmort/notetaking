import React from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Notebook from './components/Notebook';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';


export default function App() {
  return (
      <Router>
        <Switch>
            <Route exact path="/">
                <Notebook />
            </Route>
            <Route exact path="/signin">
                <SignIn />
            </Route>
            <Route exact path="/signup">
                <SignUp />
            </Route>
        </Switch>
      </Router>
  );
}

