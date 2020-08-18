import './App.css';

import React, { Fragment } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import About from './components/pages/About';
import Alert from './components/layouts/Alert';
import AlertState from './context/alert/AlertState';
import GithubState from './context/github/GithubState';
import Navbar from './components/layouts/Navbar';
import Search from './components/users/Search';
import User from './components/users/User';
import Users from './components/users/Users';

const App = () => {
    return (
        <GithubState>
            <AlertState>
                <Router>
                    <div className="App">
                        <Navbar />
                        <div className="container">
                            <Alert />
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={props => (
                                        <Fragment>
                                            <Search />
                                            <Users />
                                        </Fragment>
                                    )}
                                />
                                <Route exact path="/about" component={About} />
                                <Route
                                    exact
                                    path="/user/:login"
                                    component={User}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
};

export default App;
