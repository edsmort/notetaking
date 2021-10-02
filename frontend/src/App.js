import { useState } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Notebook from './components/Notebook';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Axios from 'axios';

export default function App() {
    const [user, setUser] = useState(false);
    
    const signIn = (email, password) => {
        Axios.post('http://localhost:3001/login', {
            email: email,
            password: password
        })
        .then(function (response) {
            console.log(response);
            //setUser();
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const signOut = () => {
        setUser(false);
    }

    const signUp = (email, password) => {
        console.log('this is the email pass: ' + email + password);
        Axios.post('http://localhost:3001/register', {
            email: email,
            password: password
        })
        .then(function (response) {
            console.log(response);
            //setUser();
        })
        .catch(function (error) {
            console.log(error);
       })
    }

  return (
      <Router>
      <Navbar user={user} signOut={signOut} />
        <Switch>
            <Route exact path="/">
                <Notebook user={user} />
            </Route>
            <Route exact path="/signin">
                <SignIn signIn={signIn} />
            </Route>
            <Route exact path="/signup">
                <SignUp signUp={signUp}/>
            </Route>
        </Switch>
      </Router>
  );
}

