import './App.css';

import React, { Fragment, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import About from './components/pages/About';
import Alert from './components/layouts/Alert';
import GithubState from './context/github/GithubState';
import Navbar from './components/layouts/Navbar';
import Search from './components/users/Search';
import User from './components/users/User';
import Users from './components/users/Users';

const App = () => {
    const [alert, setAlert] = useState('');

    //Show alert message
    const searchAlert = (message, type) => {
        // this.setState({ alert: { message, type } });
        setAlert({ message, type });
        setTimeout(() => setAlert(''), 5000);
    };

    return (
        <GithubState>
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <Alert alert={alert} />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={props => (
                                    <Fragment>
                                        <Search searchAlert={searchAlert} />
                                        <Users />
                                    </Fragment>
                                )}
                            />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/user/:login" component={User} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </GithubState>
    );
};

export default App;
