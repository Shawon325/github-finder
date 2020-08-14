import './App.css';

import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import About from './components/pages/About';
import Alert from './components/layouts/Alert';
import Axios from 'axios';
import Navbar from './components/layouts/Navbar';
import Search from './components/users/Search';
import User from './components/users/User';
import Users from './components/users/Users';

class App extends Component {
    state = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        alert: '',
    };

    // async componentDidMount() {
    //     this.setState({ loading: true });
    //     const response = await Axios.get('https://api.github.com/users');
    //     this.setState({ loading: false, users: response.data });
    // }

    //Search github users
    searchUsers = async text => {
        this.setState({ loading: true });
        const response = await Axios.get(
            'https://api.github.com/search/users?q=' + text
        );
        console.log(response);
        this.setState({ loading: false, users: response.data.items });
    };

    //Search github user
    getUser = async username => {
        this.setState({ loading: true });
        const response = await Axios.get(
            'https://api.github.com/users/' + username
        );
        console.log(response);
        this.setState({ loading: false, user: response.data });
    };

    //Search github user repos
    getUserRepos = async username => {
        this.setState({ loading: true });
        const response = await Axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
        );
        console.log(response);
        this.setState({ loading: false, repos: response.data });
    };

    //Clear users state
    clearUsers = () => this.setState({ loading: false, users: [] });

    //Show alert message
    searchAlert = (message, type) => {
        this.setState({ alert: { message, type } });
        setTimeout(() => this.setState({ alert: '' }), 5000);
    };

    render() {
        const { users, user, repos, loading } = this.state;
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <Alert alert={this.state.alert} />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={props => (
                                    <Fragment>
                                        <Search
                                            searchUsers={this.searchUsers}
                                            clearUsers={this.clearUsers}
                                            showClear={
                                                users.length > 0 ? true : false
                                            }
                                            searchAlert={this.searchAlert}
                                        />
                                        <Users
                                            loading={loading}
                                            users={users}
                                        />
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
                                        getUser={this.getUser}
                                        getUserRepos={this.getUserRepos}
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
    }
}

export default App;
