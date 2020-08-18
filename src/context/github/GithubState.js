import {
    CLEAR_USERS,
    GET_REPOS,
    GET_USER,
    SEARCH_USERS,
    SET_LOADING,
} from '../types';
import React, { useReducer } from 'react';

import Axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //Search github users
    const searchUsers = async text => {
        setLoading();
        const response = await Axios.get(
            'https://api.github.com/search/users?q=' + text
        );
        dispatch({
            type: SEARCH_USERS,
            payload: response.data.items,
        });
    };

    //Search github user
    const getUser = async username => {
        setLoading();
        const response = await Axios.get(
            'https://api.github.com/users/' + username
        );
        dispatch({
            type: GET_USER,
            payload: response.data,
        });
    };

    //Search github user repos
    const getUserRepos = async username => {
        setLoading();
        const response = await Axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
        );
        dispatch({
            type: GET_REPOS,
            payload: response.data,
        });
    };

    //Clear users state
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    //Set loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos,
            }}>
            {props.children}
        </GithubContext.Provider>
    );
};

export default GithubState;
