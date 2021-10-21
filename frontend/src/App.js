import { useState } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Notebook from './components/Notebook';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import Axios from 'axios';

export default function App() {
    const [user, setUser] = useState(false);
    
    const signIn = (email, password) => {
        Axios.post('/api/login', {
            email: email,
            password: password
        })
        .then(function (response) {
            console.log(response.data);
            setUser(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const signOut = () => {
        setUser(false);
    }

    const signUp = (email, password) => {
        Axios.post('/api/register', {
            email: email,
            password: password
        })
        .then(function (response) {
            console.log(response);
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
                {user ? <Notebook user={user} /> : <Redirect to="/signin" />}
            </Route>
            <Route exact path="/signin">
                {user ? <Redirect to="/" /> : <SignIn signIn={signIn} /> }
            </Route>
            <Route exact path="/signup">
                <SignUp signUp={signUp}/>
            </Route>
        </Switch>
      </Router>
  );
}

