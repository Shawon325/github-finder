import './App.css';

import React, { Fragment, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import About from './components/pages/About';
import Alert from './components/layouts/Alert';
import Axios from 'axios';
import Navbar from './components/layouts/Navbar';
import Search from './components/users/Search';
import User from './components/users/User';
import Users from './components/users/Users';

const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('');

    // async componentDidMount() {
    //     this.setState({ loading: true });
    //     const response = await Axios.get('https://api.github.com/users');
    //     this.setState({ loading: false, users: response.data });
    // }

    //Search github users
    const searchUsers = async text => {
        setLoading(true);
        const response = await Axios.get(
            'https://api.github.com/search/users?q=' + text
        );
        setLoading(false);
        setUsers(response.data.items);
    };

    //Search github user
    const getUser = async username => {
        setLoading(true);
        const response = await Axios.get(
            'https://api.github.com/users/' + username
        );
        setLoading(false);
        setUser(response.data);
    };

    //Search github user repos
    const getUserRepos = async username => {
        setLoading(true);
        const response = await Axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
        );
        setLoading(false);
        setRepos(response.data);
    };

    //Clear users state
    const clearUsers = () => {
        setLoading(false);
        setUsers([]);
    };

    //Show alert message
    const searchAlert = (message, type) => {
        // this.setState({ alert: { message, type } });
        setAlert({ message, type });
        setTimeout(() => setAlert(''), 5000);
    };

    return (
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
                                    <Search
                                        searchUsers={searchUsers}
                                        clearUsers={clearUsers}
                                        showClear={
                                            users.length > 0 ? true : false
                                        }
                                        searchAlert={searchAlert}
                                    />
                                    <Users loading={loading} users={users} />
                                </Fragment>
                            )}
                        />
                        <Route exact path="/about" component={About} />
                        <Route
                            exact
                            path="/user/:login"
                            render={props => (
                                <User
                                    {...props}
                                    getUser={getUser}
                                    getUserRepos={getUserRepos}
                                    user={user}
                                    repos={repos}
                                    loading={loading}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
